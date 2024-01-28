from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from ..models import Upload
from django.shortcuts import HttpResponse
import datetime
from django.http import JsonResponse
import piexif
from PIL import Image
from django.core.files.base import ContentFile
from uuid import uuid4

@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def upload(request):
    if request.method == 'POST':
        # Check if the 'image' file is present in the request
        if 'image' in request.FILES:
            image = request.FILES['image']
            user = request.user
            scan_mode = request.POST.get('scan_mode')
            date = datetime.datetime.now()

            # Rename image, remove exif
            # img = Image.open(image)
            # img.save(image.name, exif=piexif.remove(img.info['exif']))

            # Get the file extension
            ext = image.name.split('.')[-1]
            # Create a new name for the file
            new_name = '{}_{}.{}'.format(scan_mode, uuid4().hex, ext)
            # Create a new file with the new name
            image.file.seek(0)
            new_file = ContentFile(image.file.read(), name=new_name)

            Upload(image=new_file, user=user, scan_mode=scan_mode, date=date).save()

            return JsonResponse({'message': 'File uploaded successfully'})
        else:
            return JsonResponse({'error': 'No file received'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)