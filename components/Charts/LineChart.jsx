"use client";
import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getStockDataPage } from "@/app/api";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function StockLineGraph() {
  const [size, setSize] = useState(50);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  const { isError, data, error, isLoading, refetch } = useQuery({
    queryKey: ["stockDataGraph", size, year, month],
    queryFn: () => getStockDataPage(size, year, month),
  });

  const handleZoom = async (event, chartContext) => {
    const { xaxis } = chartContext;
    if (xaxis.min && xaxis.max) {
      const start = new Date(xaxis.min);
      const end = new Date(xaxis.max);
      // Calculate the zoom level
      const zoomLevel = (end - start) / (24 * 60 * 60 * 1000); // in days
      // Adjust the pageSize based on the zoom level
      let newPageSize = size;
      if (zoomLevel < 7) {
        newPageSize = Math.max(size + 50, 50);
      }
      if (zoomLevel > 7) {
        if (size > 1) {
          newPageSize = size - 50;
        }
      }
      setSize(newPageSize);
      await refetch(size);
    }
  };

  const handlePan = async (event, chartContext) => {
    // Logic to handle panning, e.g., refetching data for new date range
    await refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    data.results && (
      <div className="p-3">
        <div className="flex gap-3 items-center justify-center">
          <Button
            variant="filled"
            size="sm"
            color="indigo"
            onClick={() => {
              setMonth(1);
              setYear(null);
              refetch();
            }}
          >
            1M
          </Button>
          <Button
            variant="filled"
            size="sm"
            color="indigo"
            onClick={() => {
              setMonth(6);
              setYear(null);
              refetch();
            }}
          >
            6M
          </Button>
          <Button
            variant="filled"
            size="sm"
            color="indigo"
            onClick={() => {
              setYear(1);
              setMonth(null);
              refetch();
            }}
          >
            1Y
          </Button>
          <Button
            variant="filled"
            size="sm"
            color="indigo"
            onClick={() => {
              setYear(2);
              setMonth(null);
              refetch();
            }}
          >
            2Y
          </Button>
          <Button
            variant="filled"
            size="sm"
            color="indigo"
            onClick={() => {
              setYear(5);
              setMonth(null);
              refetch();
            }}
          >
            5Y
          </Button>
        </div>
        <Chart
          type="area"
          height={350}
          width="100%"
          series={[
            {
              name: "Close",
              data: data.results.map((item) => item.close),
            },
          ]}
          options={{
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
              },
            },
            colors: ["#1c4c96"],
            xaxis: {
              title: { text: "Dates" },
              categories: data.results.map((item) =>
                new Date(item.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
              ),
            },
            yaxis: {
              title: { text: "Close" },
            },
            chart: {
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "pan",
                show: true,
                tools: {
                  pan: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  reset: true,
                },
              },
              events: {
                zoomed: handleZoom,
                panned: handlePan,
              },
            },
          }}
        />
      </div>
    )
  );
}

export default StockLineGraph;
