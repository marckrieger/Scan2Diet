import requests
from datetime import datetime
from .models import Item, NutritionalIntake

# grocery_list = ['holm', 'flensburg', 'flensburg', 'gyro', 'mozzarella', 'brioche', 'krustenbrot', 'orange bio', 'rucola', 'cherryromatomate', 'zucchini bio', 'steinofenpizza', 'blütenhonig', 'beleg']
# store = 'rewe'

def retrieve_nutritional_info(user, grocery_list, store):
    for product in grocery_list:

        url = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + product + '&tagtype_0=countries&tag_contains_0=contains&tag_0=germany&tagtype_1=stores&tag_contains_1=contains&tag_1=' + store + '&sort_by=unique_scans_n&json=1'
        response = requests.get(url)
        data = response.json()
        
        if data["products"]!=[]:
            first_result = data["products"][0]
            nutriments = first_result["nutriments"]
            if nutriments:
                scan_name = product
                date_added = datetime.now()

                # Match name based on the first result found in the openfoodfacts database
                match_name = first_result["product_name"]
                
                # Match certainty based on the number of results found in the openfoodfacts database (the more results, the less certain the match is)
                match_certainty = 0.0
                if len(data["products"])>0:
                    match_certainty = 100 / len(data["products"])

                user = user

                nutriments_keys = ['fat', 'saturated-fat', 'carbohydrates', 'sugars', 'proteins', 'sodium', 'chloride', 'potassium', 'calcium', 'phosphorus', 'magnesium', 'sulfur', 'iron', 'zinc', 'iodine', 'selenium', 'copper', 'manganese', 'fluoride', 'chromium', 'molybdenum', 'vitamin-a', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'vitamin-c', 'vitamin-b1', 'vitamin-b2', 'vitamin-b3', 'vitamin-b5', 'vitamin-b6', 'vitamin-b7', 'vitamin-b9', 'vitamin-b12']
                db_keys = ['unsaturated_fat', 'saturated_fat', 'complex_carbohydrates', 'simple_carbohydrates', 'protein', 'sodium', 'chloride', 'potassium', 'calcium', 'phosphorus', 'magnesium', 'sulfur', 'iron', 'zinc', 'iodine', 'selenium', 'copper', 'manganese', 'fluoride', 'chromium', 'molybdenum', 'vitamin_a', 'vitamin_d', 'vitamin_e', 'vitamin_k', 'vitamin_c', 'vitamin_b1', 'vitamin_b2', 'vitamin_b3', 'vitamin_b5', 'vitamin_b6', 'vitamin_b7', 'vitamin_b9', 'vitamin_b12']

                nutriments_values = {}
                for x in range(len(nutriments_keys)):
                    nutriments_values[db_keys[x]] = nutriments.get(nutriments_keys[x], 0.0)
                
                item = Item(user=user, scan_name=scan_name, date_added=date_added, store=store, match_name=match_name, match_certainty=match_certainty, nutriments=nutriments_values)
                item.save()

                nutritional_intake, created = NutritionalIntake.objects.get_or_create(user=str(user), defaults={key: 0 for key in db_keys})

                for key, value in nutriments_values.items():
                    setattr(nutritional_intake, key, getattr(nutritional_intake, key) + value)

                nutritional_intake.save()

