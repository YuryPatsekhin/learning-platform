import { createStore } from "redux";
import rootReducer from "./Reducer";

const initialState = {
    isLoginDialogOpen: false,
  };

const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
