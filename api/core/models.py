from django.db import models

from .managers import StockDataManager


class StockData(models.Model):
    date = models.DateField(null=True, blank=True)
    trade_code = models.CharField(max_length=20)
    high = models.DecimalField(max_digits=10, decimal_places=2)
    low = models.DecimalField(max_digits=10, decimal_places=2)
    open = models.DecimalField(max_digits=10, decimal_places=2)
    close = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.PositiveIntegerField()

    objects = StockDataManager()

    def __str__(self):
        return f"{self.trade_code} on {self.date}"
