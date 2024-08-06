import axios from "axios";

const API_BASE_URL = "https://api.example.com";

const apiService = axios.create({ baseURL: API_BASE_URL });

export const getProducts = async () => {
  const products = await apiService.get("/getAll");
  return products;
};

export const getSingleProduct = async (id) => {
  const product = await apiService.get("/getProduct");
  return product;
};
