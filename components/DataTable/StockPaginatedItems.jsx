"use client";
import ReactPaginate from "react-paginate";
import StockTable from "../DataTable/StockTable.jsx";
import { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getStockData } from "@/app/api.js";

export default function StockPaginatedItems() {
  const [offset, setOffset] = useState(0);

  const { isPending, isError, data, error, isLoading } = useQuery({
    queryKey: ["stockData", offset],
    queryFn: () => getStockData(offset),
  });

  const handlePageClick = (event) => {
    const newOffset = offset + 10;
    setOffset(newOffset);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <Card className="mt-6 w-full h-full">
      <div clasName="flex items-center">
        {data ? <StockTable stockData={data.results} /> : null}
        <div className="p-4 border-t border-blue-gray-50">
          <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.count}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="mx-auto"
            nextClassName="page-item"
            nextLinkClassName=""
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination-container border border-gray-400 rounded-md"
            activeClassName="item-active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </Card>
  );
}
