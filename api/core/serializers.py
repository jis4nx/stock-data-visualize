from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import StockData


class StockDataSerializer(ModelSerializer):
    class Meta:
        model = StockData
        fields = "__all__"


class DailyStockDataSerializer(serializers.Serializer):
    date = serializers.DateField()
    avg_close = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_volume = serializers.IntegerField()
