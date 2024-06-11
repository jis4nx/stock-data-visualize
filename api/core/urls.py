from django.urls import path
from .views import Home, StockDataViewSet, ListStockDataPage
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"stockdata", StockDataViewSet, basename="stockdata")

urlpatterns = [
    path("", Home.as_view(), name="home"),
    path("stocklist/", ListStockDataPage.as_view(), name="list-stockdata"),
]


urlpatterns += router.urls
