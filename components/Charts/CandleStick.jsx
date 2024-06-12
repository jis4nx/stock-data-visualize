"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getStockDataPage } from "@/app/api";
import TradeCode from "../Dropdown/TradeCode";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CandleStick = () => {
  const [tradeCode, setTradeCode] = useState();

  const handleTradeCodeChange = (tradeCode) => {
    setTradeCode(tradeCode);
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["stockDataCandle", tradeCode],
    queryFn: () => getStockDataPage(400, undefined, undefined, tradeCode, true),
  });

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const seriesData = data.results.map((item) => ({
    x: new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    y: [item.open, item.high, item.low, item.close],
  }));

  return (
    <div className="space-y-8">
      <div className="mx-auto w-3/4">
        <TradeCode onTradeCodeChange={handleTradeCodeChange} />
      </div>
      <ReactApexChart
        options={options}
        series={[{ data: seriesData }]}
        type="candlestick"
        width={"100%"}
        height={350}
      />
    </div>
  );
};

export default CandleStick;
