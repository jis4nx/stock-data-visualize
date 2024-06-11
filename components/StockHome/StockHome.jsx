import React from "react";
import StockPaginatedItems from "../DataTable/StockPaginatedItems";
import StockLineGraph from "../Charts/LineChart";

function StockHome() {
  return (
    <div className="mx-auto space-y-8 w-4/5">
      <div>
        <StockLineGraph />
      </div>
      <StockPaginatedItems />
    </div>
  );
}

export default StockHome;
