from django.contrib import admin

# Register your models here.
from .models import Conversation, Messages

admin.site.register(Conversation)
admin.site.register(Messages)
