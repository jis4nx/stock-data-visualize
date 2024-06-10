import axios from "axios";

export const stockAPI = axios.create({
  baseURL: process.env.BASE_URL || "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export const getStockData = async (offset) => {
  const response = await stockAPI.get(`/stockdata/?offset=${offset}`);
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
  const response = await stockAPI.delete(`stockdata/${id}/`);
  return response.data;
};
