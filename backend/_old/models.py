from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class emailUser(AbstractUser):
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email