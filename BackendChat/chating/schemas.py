from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import MessageSerializer

list_message_docs = extend_schema(
    responses=MessageSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="channe_id", type=OpenApiTypes.STR, location=OpenApiParameter.QUERY, description="Id of the channel"
        )
    ],
)
