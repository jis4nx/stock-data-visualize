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
    serializer_class = DailyStockDataSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = StockData.objects.all()
        years = self.request.query_params.get("year", None)
        months = self.request.query_params.get("month", None)
        trade_code = self.request.query_params.get("trade_code", None)

        if years:
            try:
                years = int(years)
                date_threshold = datetime.now() - timedelta(days=365 * years)
                queryset = queryset.filter(date__gte=date_threshold)
            except ValueError:
                pass

        if months:
            try:
                months = int(months)
                date_threshold = datetime.now() - timedelta(days=30 * months)
                queryset = queryset.filter(date__gte=date_threshold)
            except ValueError:
                pass

        if trade_code:
            queryset = queryset.filter(trade_code=trade_code)
        # Annotate the queryset to calculate average close and total volume for each unique date
        queryset = queryset.values("date").annotate(
            avg_close=Avg("close"), total_volume=Sum("volume")
        )

        return queryset


class TradeCodeListView(APIView):
    def get(self, request, format=None):
        trade_codes = StockData.objects.values_list("trade_code", flat=True).distinct()

        trade_codes_list = list(trade_codes)
        return Response(trade_codes_list)
