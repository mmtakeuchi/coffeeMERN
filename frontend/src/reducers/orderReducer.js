import { GET_ORDERS, CHECKOUT, ORDER_ERRORS } from "../actions/orderActions";

const initialState = {
  orders: [],
  errors: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      console.log(action.orders);
      return {
        ...state,
        orders: action.orders,
      };
    case CHECKOUT:
      console.log(action.order);
      return {
        ...state,
        orders: [action.order, ...state.orders],
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
