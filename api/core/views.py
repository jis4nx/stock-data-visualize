from django.db.models import Avg, Sum
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from datetime import datetime
from django.utils import timezone
from datetime import timedelta

from .models import StockData
from .serializers import DailyStockDataSerializer, StockDataSerializer
from .pagination import StandardResultsSetPagination


class Home(APIView):
    """
    Home API endpoint.

    Returns:
        Response: A JSON response with a greeting message.
    """

    def get(self, request):
        return Response({"msg": "Hello"})


class StockDataViewSet(ModelViewSet):
    """
    ViewSet for StockData model.

    Attributes:
        filterset_fields (dict): Dictionary specifying filters for the view.
        queryset (QuerySet): QuerySet for retrieving StockData objects.
        serializer_class (Serializer): Serializer class for StockData model.
    """

    filterset_fields = {
        "trade_code": ["iexact"],
        "date": ["exact"],
    }
    queryset = StockData.objects.all().order_by("-date")
    serializer_class = StockDataSerializer


class ListStockDataPage(ListAPIView):
    """
    ListAPIView to retrieve filtered and paginated StockData objects.

    Attributes:
        pagination_class (Pagination): Pagination class for the view.
    """

    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        """
        Get the queryset for retrieving StockData objects.

        Returns:
            QuerySet: Filtered queryset based on query parameters.
        """
        queryset = StockData.objects.all()
        queryset = self.filter_by_trade_code(queryset)
        queryset = self.filter_by_year(queryset)
        queryset = self.filter_by_month(queryset)
        queryset = self.filter_unique(queryset)
        return queryset

    def filter_by_trade_code(self, queryset):
        """
        Filter queryset by trade code.

        Args:
            queryset (QuerySet): Initial queryset.

        Returns:
            QuerySet: Filtered queryset by trade code.
        """
        trade_code = self.request.query_params.get("trade_code")
        if trade_code:
            queryset = queryset.filter(trade_code=trade_code)
        return queryset

    def filter_by_year(self, queryset):
        """
        Filter queryset by year.

        Args:
            queryset (QuerySet): Initial queryset.

        Returns:
            QuerySet: Filtered queryset by year.
        """
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
        """
        Filter queryset by month.

        Args:
            queryset (QuerySet): Initial queryset.

        Returns:
            QuerySet: Filtered queryset by month.
        """
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
        """
        Filter queryset to get unique entries or aggregate by date.

        Args:
            queryset (QuerySet): Initial queryset.

        Returns:
            QuerySet: Filtered queryset.
        """
        unique = self.request.query_params.get("unique")
        if unique and unique.lower() == "true":
            queryset = queryset.get_stocks_unique_date()
        else:
            queryset = queryset.values("date").annotate(
                avg_close=Avg("close"), total_volume=Sum("volume")
            )
        return queryset

    def get_serializer_class(self):
        """
        Get serializer class based on query parameters.

        Returns:
            Serializer: Serializer class based on query parameters.
        """
        if self.request.query_params.get("unique", "").lower() == "true":
            return StockDataSerializer
        else:
            return DailyStockDataSerializer


class TradeCodeListView(APIView):
    """
    API endpoint to retrieve a list of distinct trade codes.

    Returns:
        Response: A JSON response with a list of distinct trade codes.
    """

    def get(self, request, format=None):
        trade_codes = StockData.objects.values_list("trade_code", flat=True).distinct()

        trade_codes_list = list(trade_codes)
        return Response(trade_codes_list)
