from django.db import models

class UniqueDateQuerySet(models.QuerySet):
    """
    Custom QuerySet to filter objects by unique dates.

    Methods:
        get_stocks_unique_date: Filters queryset to retrieve objects with unique dates.
    """

    def get_stocks_unique_date(self):
        """
        Filters the queryset to retrieve objects with unique dates.

        Returns:
            QuerySet: Filtered queryset containing objects with unique dates.
        """
        latest_stocks = self.values("date").annotate(max_id=models.Max("id"))

        latest_ids = [entry["max_id"] for entry in latest_stocks]
        return self.filter(id__in=latest_ids)


class StockDataManager(models.Manager):
    """
    Custom Manager for StockData model.

    Methods:
        get_queryset: Returns the queryset using UniqueDateQuerySet.
    """

    def get_queryset(self):
        return UniqueDateQuerySet(self.model, using=self._db)

