import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
