from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from ..models import Item
from django.core.serializers import serialize
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_items(request):
    # get a list of all item names of Item model
    user = request.user
    attributes = request.GET.get('attributes', '').split(',')

    if attributes:
        items = serialize('json', Item.objects.filter(user=user))
        items = json.loads(items)
        response = []
        for item in items:
            response_item = {}
            for attribute in attributes:
                response_item[attribute] = item['fields'][attribute]
            response_item['item_id'] = item['pk']
            response.append(response_item)

    else:
        items = serialize('json', Item.objects.filter(user=user).values_list('scan_name', flat=True))
        items = json.loads(items)
        response = items

    return Response(response)
