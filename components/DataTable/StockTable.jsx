"use client";
import { Alert, Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import StockDataUpdateModal from "../StockForm/StockDataModal";
import { deleteStockData } from "@/app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TABLE_HEAD = [
  "Date",
  "Trade Code",
  "High",
  "Low",
  "Open",
  "Close",
  "Volume",
  " ",
  " ",
];

export default function StockTable({ stockData, offset }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState({});
  const [deleted, setIsDeleted] = useState(false);

  const queryClient = useQueryClient();

  const deleteMuatation = useMutation({
    mutationFn: deleteStockData,
    onSuccess: () => {
      setIsDeleted(true);
      queryClient.invalidateQueries(["stockData"]);
    },
  });

  const handleDeleteStock = async (id) => {
    await deleteMuatation.mutateAsync(id);
  };

  return (
    <>
      <Alert
        className="mb-1 bg-red-600"
        open={deleted}
        onClose={() => setIsDeleted(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Stock Deleted
      </Alert>
      {modalOpen ? (
        <StockDataUpdateModal
          open={modalOpen}
          setOpen={setModalOpen}
          data={currentStock}
        />
      ) : null}
      <Card className="overflow-scroll">
        <Typography className="text-center p-4" variant="lead" color="indigo">
          Stock Market Data
        </Typography>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stockData?.map(
              (
                { id, date, trade_code, high, low, open, close, volume },
                index,
              ) => {
                const isLast = index === stockData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trade_code}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {high}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {low}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {open}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {close}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {volume}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue"
                        className="cursor-pointer font-semibold"
                        onClick={() => {
                          setCurrentStock({
                            id: id,
                            trade_code: trade_code,
                            date: date,
                            high: high,
                            low: low,
                            open: open,
                            close: close,
                            volume: volume,
                          });
                          setModalOpen(true);
                        }}
                      >
                        EDIT
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        color="red"
                        variant="small"
                        className="cursor-pointer font-semibold"
                        onClick={() => handleDeleteStock(id)}
                      >
                        DELETE
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
