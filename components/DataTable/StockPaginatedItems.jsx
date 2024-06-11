"use client";
import ReactPaginate from "react-paginate";
import StockTable from "../DataTable/StockTable.jsx";
import { useEffect, useState } from "react";
import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getStockData } from "@/app/api.js";
import Loader from "../Loader/Loader.jsx";

export default function StockPaginatedItems() {
  const [offset, setOffset] = useState(0);
  const [tradeCode, setTradeCode] = useState();
  const [search, setSearch] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["stockData", offset, search],
    queryFn: () => getStockData(offset, undefined, tradeCode),
  });

  const handlePageClick = (event) => {
    const newOffset = offset + 10;
    setOffset(newOffset);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <>
      <Card className="mt-6 w-full h-full">
        <div clasName="flex items-center">
          <div className="flex gap-3 w-2/5 my-3 items-center justify-center">
            <Input
              label="Search By Trade Code"
              name="trade_code"
              onChange={(e) => setTradeCode(e.target.value)}
            />
            <Button variant="filled" onClick={() => setSearch(true)}>
              Search
            </Button>
          </div>

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
    </>
  );
}
