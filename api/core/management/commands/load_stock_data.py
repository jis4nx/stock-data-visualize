import pandas as pd
from django.core.management import BaseCommand
from django.db import transaction

from ...models import StockData


class Command(BaseCommand):
    help = "Load stock data from CSV"

    def add_arguments(self, parser):
        """
        Define the arguments that the command can take.

        :param parser: Argument parser instance.
        """
        parser.add_argument(
            "file_path", type=str, help="The file path of the data file to be loaded"
        )

    def handle(self, *args, **kwargs):
        """
        Entry point for the command. Handles the overall process of loading
        data from a CSV file.

        :param args: Additional arguments.
        :param kwargs: Keyword arguments, including file_path.
        """
        file_path = kwargs.get("file_path")
        self.load_from_csv(file_path)

    def load_from_csv(self, file_path):
        """
        Loads stock data from a CSV file into the database.

        :param file_path: Path to the CSV file containing stock data.
        """
        try:
            chunk_size = 10000  # Number of rows to process at a time.
            for chunk in pd.read_csv(file_path, chunksize=chunk_size):
                # Clean and convert data types
                chunk["high"] = chunk["high"].replace(",", "", regex=True).astype(float)
                chunk["low"] = chunk["low"].replace(",", "", regex=True).astype(float)
                chunk["open"] = chunk["open"].replace(",", "", regex=True).astype(float)
                chunk["close"] = (
                    chunk["close"].replace(",", "", regex=True).astype(float)
                )
                chunk["volume"] = (
                    chunk["volume"].replace(",", "", regex=True).astype(int)
                )

                # Create a list of StockData instances
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
                    for _, row in chunk.iterrows()
                ]

                with transaction.atomic():
                    StockData.objects.bulk_create(stock_data_objects, batch_size=1000)

            self.stdout.write(self.style.SUCCESS("Data loaded successfully from CSV"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading data from CSV: {e}"))
