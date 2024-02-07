from django.urls import path
from .views import get_nutritional_overview

urlpatterns = [
    path('get_nutritional_overview/', get_nutritional_overview, name='api_get_nutritional_overview'),
]