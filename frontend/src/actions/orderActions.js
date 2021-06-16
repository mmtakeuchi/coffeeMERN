import axios from "axios";

export const GET_ORDERS = "GET_ORDERS";
export const CHECKOUT = "CHECKOUT";
export const ORDER_ERRORS = "ORDER_ERRORS";

export const receiveOrders = (order) => {
  GET_ORDERS, order;
};

export const checkout = (order) => {
  CHECKOUT, order;
};

export const receiveErrors = (errors) => {
  ORDER_ERRORS, errors;
};

export const getOrders = (id) => (dispatch) => {
  axios
    .get(`/api/order/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(receiveOrders(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveErrors(err));
    });
};
