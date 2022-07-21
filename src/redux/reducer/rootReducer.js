import { combineReducers } from "redux";
import { subReducer } from "./subReducer";
import { threadReducer } from "./threadReducer";
export const rootReducer = combineReducers({
  subReducer,
  threadReducer,
});
