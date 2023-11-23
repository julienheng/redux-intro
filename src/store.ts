/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import {configureStore} from "@reduxjs/toolkit"; // 
import accountReducer from "./Features/Accounts/AccountSlice";
import customerReducer from "./Features/Customers/CustomerSlice";

// STORE
// const rooterReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(
//   rooterReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  }
})

export default store;
