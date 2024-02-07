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
    
class Item(models.Model):
    # item_id = models.AutoField(primary_key=True)
    user = models.CharField(max_length=20)
    scan_name = models.CharField(max_length=100)
    date_added = models.DateTimeField()
    store = models.CharField(max_length=20)
    match_name = models.CharField(max_length=100)
    match_certainty = models.FloatField()
    nutriments = models.JSONField()
    
    def _str_(self):
        return self.name
    
class NutritionalIntake(models.Model):
    user = models.CharField(max_length=20)

    # Macro nutrients
    unsaturated_fat = models.FloatField()
    saturated_fat = models.FloatField()
    complex_carbohydrates = models.FloatField()
    simple_carbohydrates = models.FloatField()
    protein = models.FloatField()

    # Micro nutrients
    # Minerals
    sodium = models.FloatField()
    chloride = models.FloatField()
    potassium = models.FloatField()
    calcium = models.FloatField()
    phosphorus = models.FloatField()
    magnesium = models.FloatField()
    sulfur = models.FloatField()
    iron = models.FloatField()
    zinc = models.FloatField()
    iodine = models.FloatField()
    selenium = models.FloatField()
    copper = models.FloatField()
    manganese = models.FloatField()
    fluoride = models.FloatField()
    chromium = models.FloatField()
    molybdenum = models.FloatField()

    # Vitamins
    vitamin_a = models.FloatField()
    vitamin_d = models.FloatField()
    vitamin_e = models.FloatField()
    vitamin_k = models.FloatField()
    vitamin_c = models.FloatField()
    vitamin_b1 = models.FloatField()
    vitamin_b2 = models.FloatField()
    vitamin_b3 = models.FloatField()
    vitamin_b5 = models.FloatField()
    vitamin_b6 = models.FloatField()
    vitamin_b7 = models.FloatField()
    vitamin_b9 = models.FloatField()
    vitamin_b12 = models.FloatField()
    
    def _str_(self):
        return self.user