from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from ..models import Item, NutritionalIntake
from django.core.serializers import serialize
import json

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_item(request):
    # get a list of all item names of Item model
    user = request.user
    response = ''
    item_id = request.data.get('id', None)
    if item_id:
        item = Item.objects.filter(user=user, id=item_id).first()
        if item:
            nutriments = item.nutriments
            item.delete()
            nutritional_intake = NutritionalIntake.objects.get(user=str(user))
            for key, value in nutriments.items():
                if hasattr(nutritional_intake, key):
                    setattr(nutritional_intake, key, getattr(nutritional_intake, key) - value)

            nutritional_intake.save()


            response = {'message': 'Item deleted'}
        else:
            response = {'message': 'Item not found'}

    return Response(response)