from django.db import models

# Create your models here.

class Receipt(models.Model):
    country = models.CharField(max_length=50)
    store = models.CharField(max_length=20)
    product_list = models.JSONField()
    date = models.DateTimeField()

    def _str_(self):
        return self.store
    
class Upload(models.Model):
    image = models.ImageField(upload_to='user_uploads/', null=True, blank=True)
    user = models.CharField(max_length=20)
    scan_mode = models.CharField(max_length=20)
    date = models.DateTimeField()
    
    def _str_(self):
        return self.image.name