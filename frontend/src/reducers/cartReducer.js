import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CART_LOADING,
  RECEIVE_CART_ERRORS,
} from "../actions/cartActions";

const initialState = {
  cart: null,
  loading: false,
  errors: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      console.log({ ...state, cart: action.cart });
      return {
        ...state,
        cart: action.cart,
        loading: false,
      };

    case ADD_TO_CART:
      console.log(action.cart);
      return {
        ...state,
        cart: action.cart,
      };
    case DELETE_FROM_CART:
      console.log(action.cart);
      return {
        ...state,
        cart: action.cart,
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true,
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
