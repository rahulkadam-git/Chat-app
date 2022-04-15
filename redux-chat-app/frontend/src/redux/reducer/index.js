import { combineReducers } from "redux";
import authReducer from "./reducer";
import chatReducer from "./chatReducer";
import msgReducer from "./msgReducer";


export default combineReducers({
  auth: authReducer,
  chat:chatReducer,
  msg:msgReducer
});
