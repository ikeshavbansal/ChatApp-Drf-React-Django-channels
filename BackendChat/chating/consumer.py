from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from server.models import Server

from .models import Conversation, Messages

User = get_user_model()


class ChattingConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        if not self.user.is_authenticated:
            print("////////////////")
            self.close(code=4001)

        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.server_id = self.scope["url_route"]["kwargs"]["serverId"]
        print(self.server_id, "///////")

        self.user = User.objects.get(id=self.user.id)
        try:
            server = Server.objects.get(id=self.server_id)
            self.is_member = server.member.filter(id=self.user.id).exists()
        except Server.DoesNotExist:
            self.is_member = False

        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(self.channel_id, self.channel_name)

    def receive_json(self, content):
        if not self.is_member:
            return

        channel_id = self.channel_id
        sender = self.user
        message = content["message"]

        conversation, created = Conversation.objects.get_or_create(channel_id=channel_id)

        new_message = Messages.objects.create(conversation=conversation, sender=sender, content=message)

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)
