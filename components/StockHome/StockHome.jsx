import React from "react";
import StockPaginatedItems from "../DataTable/StockPaginatedItems";
import StockLineGraph from "../Charts/LineChart";
import CandleStick from "../Charts/CandleStick";

function StockHome() {
  return (
    <div className="mx-auto space-y-8 w-4/5">
      <div>
        <StockLineGraph />
      </div>
      <div>
        <CandleStick />
      </div>
      <StockPaginatedItems />
    </div>
  );
}

export default StockHome;
