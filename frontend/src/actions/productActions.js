import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const RECEIVE_PRODUCT_ERRORS = "RECEIVE_PRODUCT_ERRORS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getItems = (products) => ({
  type: GET_PRODUCTS,
  products,
});

export const getItem = (product) => ({
  type: GET_PRODUCT,
  product,
});

export const createProduct = (newProduct) => ({
  type: ADD_PRODUCT,
  newProduct,
});

export const updateItem = (updatedProduct) => ({
  type: UPDATE_PRODUCT,
  updatedProduct,
});

export const deleteItem = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors,
});

export const getProducts = () => (dispatch) => {
  axios
    .get("/api/products")
    .then((res) => {
      dispatch(getItems(res.data));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(receiveErrors(err.response.data));
    });
};

export const addProduct = (newProduct) => (dispatch) => {
  console.log(newProduct);
  axios
    .post("/api/products", newProduct)
    .then((res) => {
      console.log(res);
      dispatch(createProduct(res.data));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const getProduct = (productId) => (dispatch) => {
  axios
    .get(`/api/products/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch(getItem(res.data));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const deleteProduct = (productId) => (dispatch) => {
  axios
    .delete(`/api/products/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch(deleteItem(productId));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const updateProduct = (productId, updatedProduct) => (dispatch) => {
  console.log(productId, updatedProduct);
  axios
    .put(`/api/products/${productId}`, updatedProduct)
    .then((res) => {
      console.log(res.data);
      dispatch(updateItem(res.data));
    })
    .catch((err) => dispatch(receiveErrors(err)));
};
