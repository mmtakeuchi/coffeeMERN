import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  RECEIVE_CART_ERRORS,
} from "../actions/cartActions";

const initialState = {
  cart: {},
  errors: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { state };
  }
};

export default cartReducer;
