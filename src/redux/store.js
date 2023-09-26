import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/rootReducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todo");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("todo", JSON.stringify(store.getState()));
  return result;
};

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(localStorageMiddleware)
);
export default store;
