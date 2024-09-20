import { combineReducers } from "redux";
import { userReducer } from "./userReducer"; // Correct import

const rootReducer = combineReducers({
  user: userReducer, // Correct reference to userReducer
});

export default rootReducer;
