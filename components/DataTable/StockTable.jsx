"use client";
import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import StockDataUpdateModal from "../StockForm/StockDataModal";

const TABLE_HEAD = [
  "Date",
  "Trade Code",
  "High",
  "Low",
  "Open",
  "Close",
  "Volume",
  " ",
];

export default function StockTable({ stockData, offset }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState({});
  return (
    <>
      {modalOpen ? (
        <StockDataUpdateModal
          open={modalOpen}
          setOpen={setModalOpen}
          data={currentStock}
        />
      ) : null}
      <Card className="overflow-scroll">
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
                        className="font-normal cursor-pointer"
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
                        Edit
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
