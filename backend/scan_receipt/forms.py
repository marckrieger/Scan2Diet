from django import forms
from .models import ReceiptImage

class PhotoForm(forms.ModelForm):
    class Meta:
        model = ReceiptImage
        fields = ['receipt_image', 'date']