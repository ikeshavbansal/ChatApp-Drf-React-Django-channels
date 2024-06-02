from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from .models import Server
from .serializers import ServerSerializers


class ServerListViewSet(viewsets.ViewSet):
    querySet = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if by_user or by_serverid and not request.user.is_authenticated:
            print("inside")
            raise AuthenticationFailed()

        if category:
            self.querySet = self.querySet.filter(category__name=category)

        if by_user:
            user_id = request.user.id
            self.querySet = self.querySet.filter(member=user_id)

        if with_num_members:
            self.querySet = self.querySet.annotate(num_members=Count("member"))

        if qty:
            self.querySet = self.querySet[: int(qty)]

        if by_serverid:
            try:
                self.querySet = self.querySet.filter(id=by_serverid)
                if not self.querySet.exists():
                    raise ValidationError(detail=f"server not present {by_serverid}")

            except ValueError:
                raise ValidationError(detail=f"server value error")

        serializer = ServerSerializers(self.querySet, many=True, context={"num_members": with_num_members})

        return Response(serializer.data)
