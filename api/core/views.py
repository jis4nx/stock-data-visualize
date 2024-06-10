from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StockData
from .serializers import StockDataSerializer
from rest_framework.viewsets import ModelViewSet


class Home(APIView):
    def get(self, request):
        return Response({"msg": "Hello"})


class StockDataViewSet(ModelViewSet):
    queryset = StockData.objects.all()
    serializer_class = StockDataSerializer
