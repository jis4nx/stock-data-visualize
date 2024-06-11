import { getTradeCodes } from "@/app/api";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

function TradeCode({ onTradeCodeChange }) {

  const { isError, data, error, isLoading, refetch } = useQuery({
    queryKey: ["tradeCode"],
    queryFn: getTradeCodes,
  });

  const handleChange = (selectedOption) => {
    onTradeCodeChange(selectedOption.value);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : data ? (
        <Select
          options={data.map((item) => ({
            value: item,
            label: item,
          }))}
          isSearchable
          onChange={handleChange}
          placeholder="Select Trade Code"
          isClearable
        />
      ) : null}
    </div>
  );
}

export default TradeCode;
