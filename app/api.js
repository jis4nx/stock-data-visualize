import axios from "axios";

export const stockAPI = axios.create({
  baseURL: process.env.BASE_URL || "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export const getStockData = async (offset) => {
  const response = await stockAPI.get(`/stockdata/?offset=${offset}`);
  return response.data;
};
