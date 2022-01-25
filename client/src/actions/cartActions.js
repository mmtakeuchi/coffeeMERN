import axios from "axios";

export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CART_LOADING = "CART_LOADING";
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

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};

export const getCart = (userId) => (dispatch) => {
  dispatch(setCartLoading());

  axios
    .get(`/api/cart/${userId}`)
    .then((res) => {
      dispatch(getCartItems(res.data));
    })
    .catch((err) => {
      dispatch(receiveErrors(err));
    });
};

export const addToCart = (userId, productId, count) => (dispatch) => {
  axios
    .post(`/api/cart/${userId}`, { productId, count })
    .then((res) => {
      console.log(res);
      dispatch(addCartItem(res.data));
    })
    .catch((err) => {
      dispatch(receiveErrors(err));
    });
};

export const deleteFromCart = (userId, product) => (dispatch) => {
  axios
    .delete(`/api/cart/${userId}/${product.product}`)
    .then((res) => {
      dispatch(deleteCartItem(res.data));
    })
    .catch((err) => dispatch(receiveErrors(err)));
};
