from django.urls import path
from .views import Home, StockDataViewSet, ListStockDataPage, TradeCodeListView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"stockdata", StockDataViewSet, basename="stockdata")

urlpatterns = [
    path("", Home.as_view(), name="home"),
    path("stocklist/", ListStockDataPage.as_view(), name="list-stockdata"),
    path('tradecodes/', TradeCodeListView.as_view(), name="list-tradecode")
]


urlpatterns += router.urls
