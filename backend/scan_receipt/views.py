from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReceiptSerializer
from .models import Receipt

# Create your views here.

class ReceiptView(viewsets.ModelViewSet):
    serializer_class = ReceiptSerializer
    queryset = Receipt.objects.all()