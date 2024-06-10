from rest_framework.serializers import ModelSerializer
from .models import StockData


class StockDataSerializer(ModelSerializer):
    class Meta:
        model = StockData
        fields = "__all__"
