from django.db.models import Avg, Sum
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from datetime import datetime
from datetime import timedelta

from .models import StockData
from .serializers import DailyStockDataSerializer, StockDataSerializer
from .pagination import StandardResultsSetPagination


class Home(APIView):
    def get(self, request):
        return Response({"msg": "Hello"})


class StockDataViewSet(ModelViewSet):
    # Sorting By date in descending order
    filterset_fields = {
        "trade_code": ["iexact"],
        "date": ["exact"],
    }
    queryset = StockData.objects.all().order_by("-date")
    serializer_class = StockDataSerializer


class ListStockDataPage(ListAPIView):
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = StockData.objects.all()
        queryset = self.filter_by_trade_code(queryset)
        queryset = self.filter_by_year(queryset)
        queryset = self.filter_by_month(queryset)
        queryset = self.filter_unique(queryset)
        return queryset

    def filter_by_trade_code(self, queryset):
        trade_code = self.request.query_params.get("trade_code")
        if trade_code:
            queryset = queryset.filter(trade_code=trade_code)
        return queryset

    def filter_by_year(self, queryset):
        years = self.request.query_params.get("year")
        if years:
            try:
                years = int(years)
                date_threshold = timezone.now() - timedelta(days=365 * years)
                queryset = queryset.filter(date__gte=date_threshold)
            except ValueError:
                pass
        return queryset

    def filter_by_month(self, queryset):
        months = self.request.query_params.get("month")
        if months:
            try:
                months = int(months)
                date_threshold = timezone.now() - timedelta(days=30 * months)
                queryset = queryset.filter(date__gte=date_threshold)
            except ValueError:
                pass
        return queryset

    def filter_unique(self, queryset):
        unique = self.request.query_params.get("unique")
        if unique and unique.lower() == "true":
            queryset = queryset.get_stocks_unique_date()
        else:
            queryset = queryset.values("date").annotate(
                avg_close=Avg("close"), total_volume=Sum("volume")
            )
        return queryset

    def get_serializer_class(self):
        if self.request.query_params.get("unique", "").lower() == "true":
            return StockDataSerializer
        else:
            return DailyStockDataSerializer


class TradeCodeListView(APIView):
    def get(self, request, format=None):
        trade_codes = StockData.objects.values_list("trade_code", flat=True).distinct()

        trade_codes_list = list(trade_codes)
        return Response(trade_codes_list)
