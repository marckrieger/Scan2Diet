from django.urls import path
from .views import delete_item

urlpatterns = [
    path('delete_item/', delete_item, name='api_delete_item'),
]