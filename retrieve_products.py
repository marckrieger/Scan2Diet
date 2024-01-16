import requests

# Processing to do:
# - words with ue, ae & oe are searched twice, once with and without replacing with umlauts
# - searches with 0 or more than x results should be ignored
# - search with store=store criterion, if it fails search without

products = ['milchschokostreusel', 'vanille', 'vollkorn+toast']
store = 'rewe'
receipt = {'store': store, 'products': products}

for product in products:

    url = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=' + product + '&tagtype_0=countries&tag_contains_0=contains&tag_0=germany&tagtype_1=stores&tag_contains_1=contains&tag_1=rewe&sort_by=unique_scans_n&json=1'
    response = requests.get(url)
    data = response.json()

    first_result = data["products"][0]
    nutriments = first_result["nutriments"]

    print(nutriments)