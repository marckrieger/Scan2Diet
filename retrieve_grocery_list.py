import requests

grocery_list = ['holm', 'flensburg', 'flensburg', 'gyro', 'mozzarella', 'brioche', 'krustenbrot', 'orange bio', 'rucola', 'cherryromatomate', 'zucchini bio', 'steinofenpizza', 'blütenhonig', 'beleg']
store = 'rewe'

for product in grocery_list:

    url = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + product + '&tagtype_0=countries&tag_contains_0=contains&tag_0=germany&tagtype_1=stores&tag_contains_1=contains&tag_1=rewe&sort_by=unique_scans_n&json=1'
    response = requests.get(url)
    data = response.json()

    if data["products"]!=[]:
        first_result = data["products"][0]
        nutriments = first_result["nutriments"]

        print(nutriments)

        # store every grocery_list item in database with corresponding name, nutriments, store, and boolean found/not found in openfoodfacts database