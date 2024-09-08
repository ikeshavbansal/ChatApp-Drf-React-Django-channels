from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Conversation, Messages

User = get_user_model()


class ChattingConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.accept()
        print(self.scope)
        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name,  # channel_name is the unique channel ID of request done by the client
        )

    # receive function is called when a message is received from websocket to the Consumer (server)
    # What happens is that the message is sent to the group (room) where all the other clients are connected
    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]

        conversation, _ = Conversation.objects.get_or_create(channel_id=channel_id)

        new_message = Messages.objects.create(conversation=conversation, sender=sender, content=message)

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat_message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    # This function must have the same name as the one in the receive function "chat_message"
    def chat_message(self, event):
        self.send_json(event)  # send_json is a function of JsonWebsocketConsumer

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)
