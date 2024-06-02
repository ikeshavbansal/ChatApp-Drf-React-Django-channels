from rest_framework import serializers

from .models import Channels, Server


class ChannelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Channels
        fields = "__all__"


class ServerSerializers(serializers.ModelSerializer):
    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializers(many=True)

    class Meta:
        model = Server
        exclude = ("member",)

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members", None)
        return data
