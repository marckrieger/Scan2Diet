# Generated by Django 5.0.1 on 2024-01-28 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_upload_scan_mode'),
    ]

    operations = [
        migrations.AddField(
            model_name='upload',
            name='user',
            field=models.CharField(default='demo', max_length=20),
            preserve_default=False,
        ),
    ]
