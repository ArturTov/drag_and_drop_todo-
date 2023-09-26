import { combineReducers } from "redux";
import { toDoReducer } from "./toDoReducer";
const rootReducer = combineReducers({
  todo: toDoReducer,
});
export default rootReducer;
