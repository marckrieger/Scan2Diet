# store kassenbon1.txt text in receipt variable

receiptFile = open('kassenbon2.txt', 'r')
receipt = receiptFile.read()
receiptFile.close()

# first line of receipt is always the store name (identify: rewe, aldi, netto, lidl, edeka, penny)


# Azure text analytics
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient
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

print(store)

for idx, doc in enumerate(response):
    for entity in doc.entities:
        if entity.category == "Product" or entity.category == "Location":
            entity_text = entity.text.lower().replace('ue', 'ü').replace('ae', 'ä').replace('oe', 'ö')
            grocery_list.append(entity_text)

print(grocery_list)