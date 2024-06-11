from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from datetime import datetime
from datetime import timedelta

from .models import StockData
from .serializers import StockDataSerializer
from .pagination import StandardResultsSetPagination


class Home(APIView):
    def get(self, request):
        return Response({"msg": "Hello"})


class StockDataViewSet(ModelViewSet):
    # Sorting By date in descending order
    queryset = StockData.objects.all().order_by("-date")
    serializer_class = StockDataSerializer


class ListStockDataPage(ListAPIView):
    serializer_class = StockDataSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = StockData.objects.all().order_by("-date")
        years = self.request.query_params.get("year", None)
        months = self.request.query_params.get("month", None)

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

        return queryset
