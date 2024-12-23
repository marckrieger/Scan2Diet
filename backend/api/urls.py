from django.urls import path
from .views import user_login, user_logout, user_register, get_csrf_token

urlpatterns = [
    path('user_login/', user_login, name='api_user_login'),
    path('user_logout/', user_logout, name='api_user_logout'),
    path('user_register/', user_register, name='api_user_register'),
    path('get_csrf_token/', get_csrf_token, name='api_get_csrf_token'),
]