import { promises as fs } from "fs";
import StockPaginatedItems from "../components/DataTable/StockPaginatedItems.jsx";

async function getData() {
  const file = await fs.readFile(
    process.cwd() + "/public/stock_market_data.json",
    "utf8",
  );
  const data = JSON.parse(file);
  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="mx-auto">
      <StockPaginatedItems items={data} itemsPerPage={10} />
    </div>
  );
}
