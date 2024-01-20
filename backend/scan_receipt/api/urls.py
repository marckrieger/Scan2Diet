from django.urls import path
from .views import upload_receipt

urlpatterns = [
    path('upload_receipt/', upload_receipt, name='api_upload_receipt'),
]