import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
});

export default rootReducer;
