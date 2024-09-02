from chating.consumer import ChattingConsumer
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import CategoryListViewSet, ServerListViewSet

router = DefaultRouter()
router.register("api/server/select", ServerListViewSet, basename="ServerListViewSet")

router.register("api/server/category", CategoryListViewSet, basename="CategoryListViewSet")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
] + router.urls

websocket_urlpatterns = [path("ws/test", ChattingConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
