from django.contrib import admin
from .models import Receipt

class ReceiptAdmin(admin.ModelAdmin):
    list_display = ('country', 'store', 'product_list', 'date', 'receipt_image')

# Register your models here.

admin.site.register(Receipt, ReceiptAdmin)