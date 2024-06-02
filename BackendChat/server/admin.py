from django.contrib import admin

# Register your models here.
from .models import Category, Channels, Server

admin.site.register(Channels)
admin.site.register(Server)
admin.site.register(Category)
