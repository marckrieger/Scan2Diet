from django.contrib import admin
from .models import Receipt, ReceiptImage

class ReceiptAdmin(admin.ModelAdmin):
    list_display = ('country', 'store', 'product_list', 'date')

class ReceiptImageAdmin(admin.ModelAdmin):
    list_display = ('receipt_image', 'date')

# Register your models here.

admin.site.register(Receipt, ReceiptAdmin)
admin.site.register(ReceiptImage, ReceiptImageAdmin)