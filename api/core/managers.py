from django.db import models


class UniqueDateQuerySet(models.QuerySet):
    def get_stocks_unique_date(self):
        latest_stocks = self.values("date").annotate(max_id=models.Max("id"))

        latest_ids = [entry["max_id"] for entry in latest_stocks]
        return self.filter(id__in=latest_ids)


class StockDataManager(models.Manager):
    def get_queryset(self):
        return UniqueDateQuerySet(self.model, using=self._db)
