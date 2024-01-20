from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from ..models import ReceiptImage
from django.shortcuts import HttpResponse
import datetime
from django.http import JsonResponse

@csrf_exempt
@login_required
def upload_receipt(request):
    if request.method == 'POST':
        # Check if the 'receipt_image' file is present in the request
        if 'receipt_image' in request.FILES:
            receipt_image = request.FILES['receipt_image']
            date = datetime.datetime.now()

            ReceiptImage(receipt_image=receipt_image, date=date).save()

            return JsonResponse({'message': 'File uploaded successfully'})
        else:
            return JsonResponse({'error': 'No file received'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


# @csrf_exempt
# def upload_receipt(request):
#     receipt_image = request.receipt_image
#     date = datetime.datetime.now()

#     ReceiptImage(receipt_image=receipt_image, date=date).save()

#     return HttpResponse("Upload successfull!")