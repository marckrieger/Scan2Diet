from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from ..models import NutritionalIntake
from django.core.serializers import serialize
import json
from itertools import islice

@api_view(['GET'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_nutritional_overview(request):
    # get a dict from NutritionalIntake
    user = request.user
    if not NutritionalIntake.objects.filter(user=user).exists():
        nutriments_keys = ['fat', 'saturated-fat', 'carbohydrates', 'sugars', 'proteins', 'sodium', 'chloride', 'potassium', 'calcium', 'phosphorus', 'magnesium', 'sulfur', 'iron', 'zinc', 'iodine', 'selenium', 'copper', 'manganese', 'fluoride', 'chromium', 'molybdenum', 'vitamin-a', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'vitamin-c', 'vitamin-b1', 'vitamin-b2', 'vitamin-b3', 'vitamin-b5', 'vitamin-b6', 'vitamin-b7', 'vitamin-b9', 'vitamin-b12']
        db_keys = ['unsaturated_fat', 'saturated_fat', 'complex_carbohydrates', 'simple_carbohydrates', 'protein', 'sodium', 'chloride', 'potassium', 'calcium', 'phosphorus', 'magnesium', 'sulfur', 'iron', 'zinc', 'iodine', 'selenium', 'copper', 'manganese', 'fluoride', 'chromium', 'molybdenum', 'vitamin_a', 'vitamin_d', 'vitamin_e', 'vitamin_k', 'vitamin_c', 'vitamin_b1', 'vitamin_b2', 'vitamin_b3', 'vitamin_b5', 'vitamin_b6', 'vitamin_b7', 'vitamin_b9', 'vitamin_b12']

        nutriments_values = {}
        for x in range(len(nutriments_keys)):
            nutriments_values[db_keys[x]] = 0.0

        nutritional_intake, created = NutritionalIntake.objects.get_or_create(user=str(user), defaults={key: 0 for key in db_keys})

        for key, value in nutriments_values.items():
            setattr(nutritional_intake, key, getattr(nutritional_intake, key) + value)

        nutritional_intake.save()

    nutritional_intake = NutritionalIntake.objects.filter(user=user).values()
    nutritional_dict = nutritional_intake[0]
    keys = list(nutritional_dict.keys())
    macronutrients = {k: int(nutritional_dict[k]) for k in islice(keys, 2, 7)}
    minerals = {k: int(nutritional_dict[k]) for k in islice(keys, 7, 23)}
    vitamins = {k: int(nutritional_dict[k]) for k in islice(keys, 23, None)}
    nutritional_overview = {'macronutrients': macronutrients, 'minerals': minerals, 'vitamins': vitamins}
    print(nutritional_overview)
    return Response(nutritional_overview)