"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from api.views import user_login, user_logout, user_register, get_csrf_token
from api.upload.views import upload
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken import views
from api.get_items.views import get_items
from api.get_nutritional_overview.views import get_nutritional_overview
from api.delete_item.views import delete_item

urlpatterns = [
    path("admin/", admin.site.urls),
    path('user_login/', user_login, name='user_login'),
    path('user_logout/', user_logout, name='user_logout'),
    path('user_register/', user_register, name='user_register'),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
    path('upload/', upload, name='upload'),
    path('obtain_token/', views.obtain_auth_token),
    path('get_items/', get_items, name='api_get_items'),
    path('get_nutritional_overview/', get_nutritional_overview, name='api_get_nutritional_overview'),
    path('delete_item/', delete_item, name='api_delete_item'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)