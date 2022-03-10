import { combineReducers } from "redux";
import authReducer from "./auth";
import plantReducer from "./plant";
import customeReducer from "./custom";

export default combineReducers({
  authReducer,
  plantReducer,
  customeReducer,
});
