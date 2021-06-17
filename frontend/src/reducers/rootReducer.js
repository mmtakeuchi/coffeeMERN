import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;
