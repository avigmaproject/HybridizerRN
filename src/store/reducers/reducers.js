import { combineReducers } from "redux";
import authReducer from "./auth";
import plantReducer from "./plant";

export default combineReducers({
  authReducer,
  plantReducer,
});
