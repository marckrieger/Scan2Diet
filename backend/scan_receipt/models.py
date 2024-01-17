from django.db import models

# Create your models here.

class Receipt(models.Model):
    country = models.CharField(max_length=50)
    store = models.CharField(max_length=20)
    product_list = models.JSONField()
    date = models.DateTimeField()
    receipt_image = models.ImageField(upload_to='receipt_images/', null=True, blank=True)

    def _str_(self):
        return self.store