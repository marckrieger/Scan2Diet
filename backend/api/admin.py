from django.contrib import admin
from .models import Upload, Item, NutritionalIntake

# Register your models here.
admin.site.register(Upload)
admin.site.register(Item)
admin.site.register(NutritionalIntake)