import axios from "axios";

const API_BASE_URL = "http://localhost:8080/webshop";

const apiService = axios.create({ baseURL: API_BASE_URL });

export const getProducts = async () => {
  const products = await apiService.get("/getAll");
  return products;
};

export const getSingleProduct = async (id) => {
  const product = await apiService.get("/getProduct");
  return product;
};

export const saveOrder = async (
  customerId,
  status,
  totalAmount,
  shippingAddressId,
  billingAddressId
) => {
  const orderResponse = await apiService.post("/order/saveOrder", {
    customerId,
    status,
    totalAmount,
    shippingAddressId,
    billingAddressId,
  });
  return orderResponse;
};

export const stripePayment = async (
  cardNumber,
  cardExpiryMonth,
  cardExpiryYear,
  cardCVC,
  token,
  amount
) => {
  const formData = new FormData();
  formData.append("cardNumber", cardNumber);
  formData.append("cardExpiryMonth", cardExpiryMonth);
  formData.append("cardExpiryYear", cardExpiryYear);
  formData.append("cardCVC", cardCVC);
  formData.append("token", token);
  formData.append("amount", amount);

  const payment = await apiService.post("/payment/charge", formData);
  console.log(payment)
  return payment;
};

export const createCustomer = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  zipCode,
  country,
  state,
  city
) => {
  const newCustomer = await apiService.post("/customer/saveCustomer", {
    firstName,
    lastName,
    email,
    phoneNumber,
    street: address,
    zipCode,
    country,
    state,
    city
  });
  return newCustomer;
};

export const findAllCategories = async () => {
  const categoriesAndProducts = await apiService.get("/category/findAll");
  return categoriesAndProducts;
}

export const getProduct = async (id) => {
  const product = await apiService.get("/product/getProduct");
  return product;
}

export const getAllProducts = async () => {
  const products = await apiService.get("/product/getAll");
  return products;
}

export const getProductsbyCategory = async (id) => {
  const productsbyCategory = await apiService.get('/product/getProductsByCategory?id=' + id);
  return productsbyCategory;
}
