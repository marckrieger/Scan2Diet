# Generated by Django 5.0.1 on 2024-02-02 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_nutritionalintake'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='user',
            field=models.CharField(default='demo2', max_length=20),
            preserve_default=False,
        ),
    ]