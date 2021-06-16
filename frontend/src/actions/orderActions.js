import axios from "axios";

export const GET_ORDERS = "GET_ORDERS";
export const CHECKOUT = "CHECKOUT";
export const ORDER_ERRORS = "ORDER_ERRORS";

export const receiveOrders = (orders) => {
  GET_ORDERS, orders;
};

export const chargeOrder = (order) => {
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

export const checkout = (id, source) => (dispatch) => {
  axios
    .post(`/api/order/${id}`, { source })
    .then((res) => {
      console.log(res);
      dispatch(chargeOrder(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveErrors(err));
    });
};
