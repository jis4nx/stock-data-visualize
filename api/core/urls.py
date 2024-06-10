from django.urls import path
from .views import Home, StockDataViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"stockdata", StockDataViewSet)

urlpatterns = [path("", Home.as_view(), name="home")]


urlpatterns += router.urls
