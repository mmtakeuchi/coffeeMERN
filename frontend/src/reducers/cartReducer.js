import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  RECEIVE_CART_ERRORS,
} from "../actions/cartActions";

const initialState = {
  cart: null,
  errors: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      console.log({ ...state, cart: action.cart });
      return {
        ...state,
        cart: action.cart,
      };

    case ADD_TO_CART:
      console.log(action.cart);
      return {
        ...state,
        cart: action.cart,
      };
    case RECEIVE_CART_ERRORS:
      return {
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default cartReducer;
