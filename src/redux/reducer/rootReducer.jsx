import { combineReducers } from "redux";
import { subReducer } from "./subReducer";
export const rootReducer = combineReducers({
  subReducer,
});
