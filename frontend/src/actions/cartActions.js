import axios from "axios";

export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const RECEIVE_CART_ERRORS = "RECEIVE_CART_ERRORS";

export const getCartItems = (cart) => ({
  type: GET_CART,
  cart,
});

export const addCartItem = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const deleteCartItem = (cart) => ({
  type: DELETE_FROM_CART,
  cart,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_CART_ERRORS,
  errors,
});

export const getCart = (userId) => (dispatch) => {
  console.log(userId);
  axios
    .get(`/api/cart/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch(getCartItems(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveErrors(err));
    });
};

export const addToCart = (userId, productId, count) => (dispatch) => {
  console.log(`user: ${userId}, product: ${productId}, ${count}`);
  axios
    .post(`api/cart/${userId}`, { productId, count })
    .then((res) => {
      console.log(res.data);
      dispatch(addCartItem(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveErrors(err));
    });
};