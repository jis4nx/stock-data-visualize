import axios from "axios";

export const stockAPI = axios.create({
  baseURL: process.env.BASE_URL || "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export const getStockData = async (offset, limit = 10, tradeCode) => {
  const response = await stockAPI.get("/stockdata/", {
    params: {
      limit: limit,
      offset: offset,
      trade_code__iexact: tradeCode,
    },
  });
  return response.data;
};

export const getStockDataPage = async (size, year, month, tradeCode) => {
  const response = await stockAPI.get("/stocklist/", {
    params: {
      size: size,
      year: year || null,
      month: month || null,
      trade_code: tradeCode || null,
    },
  });
  return response.data;
};

export const createStockData = async (stock) => {
  const response = await stockAPI.post("stockdata/", stock);
  return response.data;
};

export const updateStockData = async (stock) => {
  console.log(stock);
  const response = await stockAPI.put(`stockdata/${stock.id}/`, stock);
  return response.data;
};

export const deleteStockData = async (id) => {
  console.log(id)
  const response = await stockAPI.delete(`stockdata/${id}/`);
  return response.data;
};
export const getTradeCodes = async () => {
  const response = await stockAPI.get(`/tradecodes/`);
  return response.data;
};
