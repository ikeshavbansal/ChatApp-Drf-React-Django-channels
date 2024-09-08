from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Conversation
from .schemas import list_message_docs
from .serializers import MessageSerializer

# Create your views here.


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        conversation = Conversation.objects.get(channel_id=channel_id)
        messages = conversation.message.all()

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
