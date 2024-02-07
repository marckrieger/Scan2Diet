import os
import time
from .retrieve_nutritional_info import retrieve_nutritional_info

# Azure OCR
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

# Azure text analytics
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

# Transform receipt image into text with Azure Computer Vision
def process_receipt(file_name, user):
    # Authenticate
    subscription_key = os.environ["VISION_KEY"]
    endpoint = os.environ["VISION_ENDPOINT"]
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    # Open the image
    receipt_path = file_name
    with open(receipt_path, 'rb') as image:
        # Call API with image and raw response (allows you to get the operation location)
        read_response = computervision_client.read_in_stream(image, raw=True)

    # Get the operation location (URL with an ID at the end) from the response
    read_operation_location = read_response.headers["Operation-Location"]
    # Grab the ID from the URL
    operation_id = read_operation_location.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results 
    while True:
        read_result = computervision_client.get_read_result(operation_id)
        if read_result.status not in ['notStarted', 'running']:
            break
        time.sleep(1)

    # Store text in string
    receipt_text = ''
    if read_result.status == OperationStatusCodes.succeeded:
        for text_result in read_result.analyze_result.read_results:
            for line in text_result.lines:
                receipt_text += line.text + '\n'

    retrieve_grocery_list(user, receipt_text)


# Transform receipt OCR Text into a list with grocery items with Azure Text Analytics
def retrieve_grocery_list(user, receipt):
    endpoint = os.environ["AZURE_LANGUAGE_ENDPOINT"]
    key = os.environ["AZURE_LANGUAGE_KEY"]

    text_analytics_client = TextAnalyticsClient(endpoint, AzureKeyCredential(key))

    receipts = [receipt]

    response = text_analytics_client.recognize_entities(documents=receipts)

    grocery_list = []

    store = ''

    store_list = ['rewe', 'aldi', 'netto', 'lidl', 'edeka', 'penny', 'kaufland', 'real', 'famila', 'tegut']
    receipt_first_line = receipt.split('\n')[0].lower()

    if receipt_first_line in store_list:
        store = receipt_first_line

    for idx, doc in enumerate(response):
        for entity in doc.entities:
            if entity.category == "Product" or entity.category == "Location":
                entity_text = entity.text.lower().replace('ue', 'ü').replace('ae', 'ä').replace('oe', 'ö')
                grocery_list.append(entity_text)

    retrieve_nutritional_info(user, grocery_list, store)