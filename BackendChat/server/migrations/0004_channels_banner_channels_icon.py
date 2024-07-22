# Generated by Django 4.2.13 on 2024-06-25 15:57

from django.db import migrations, models
import server.models
import server.validator


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0003_rename_icons_category_icon"),
    ]

    operations = [
        migrations.AddField(
            model_name="channels",
            name="banner",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to=server.models.server_banner_upload_path,
                validators=[server.validator.validate_image_file_extention],
            ),
        ),
        migrations.AddField(
            model_name="channels",
            name="icon",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to=server.models.server_icon_upload_path,
                validators=[
                    server.validator.validate_icon_image_size,
                    server.validator.validate_image_file_extention,
                ],
            ),
        ),
    ]
