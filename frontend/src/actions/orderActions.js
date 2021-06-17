import axios from "axios";

export const GET_ORDERS = "GET_ORDERS";
export const CHECKOUT = "CHECKOUT";
export const ORDER_ERRORS = "ORDER_ERRORS";

export const receiveOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});

export const checkout = (order) => ({
  type: CHECKOUT,
  order,
});

export const receiveErrors = (errors) => ({
  type: ORDER_ERRORS,
  errors,
});

export const getOrders = (userId) => (dispatch) => {
  console.log(userId);
  axios
    .get(`/api/orders/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch(receiveOrders(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveErrors(err));
    });
};

export const chargeOrder = (id, source) => (dispatch) => {
  axios
    .post(`/api/orders/${id}`, { source })
    .then((res) => {
      console.log(res);
      dispatch(checkout(res.data));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};
