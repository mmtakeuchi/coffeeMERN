import { GET_ORDERS, CHECKOUT, ORDER_ERRORS } from "../actions/orderActions";

const initialState = {
  orders: [],
  errors: [],
  status: "pending",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        status: "pending",
      };
    case CHECKOUT:
      return {
        ...state,
        orders: [action.order, ...state.orders],
        status: "success",
      };
    case ORDER_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default orderReducer;
