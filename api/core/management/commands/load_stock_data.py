import pandas as pd
from django.core.management import BaseCommand

from ...models import StockData


class Command(BaseCommand):
    help = "Load stock data from CSV"

    def add_arguments(self, parser):
        parser.add_argument(
            "file_path", type=str, help="The file path of the data file to be loaded"
        )

    def handle(self, *args, **kwargs):

        # Loading Stock market csv data to database
        file_path = kwargs.get("file_path")
        self.load_from_csv(file_path)

    def load_from_csv(self, file_path):
        try:
            df = pd.read_csv(file_path)
            df["high"] = df["high"].replace(",", "", regex=True).astype(float)
            df["low"] = df["low"].replace(",", "", regex=True).astype(float)
            df["open"] = df["open"].replace(",", "", regex=True).astype(float)
            df["close"] = df["close"].replace(",", "", regex=True).astype(float)
            df["volume"] = df["volume"].replace(",", "", regex=True).astype(int)

            stock_data_objects = [
                StockData(
                    date=row["date"],
                    trade_code=row["trade_code"],
                    high=row["high"],
                    low=row["low"],
                    open=row["open"],
                    close=row["close"],
                    volume=row["volume"],
                )
                for _, row in df.iterrows()
            ]
            StockData.objects.bulk_create(stock_data_objects)
            self.stdout.write(self.style.SUCCESS("Data loaded successfully from CSV"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading data from CSV: {e}"))
