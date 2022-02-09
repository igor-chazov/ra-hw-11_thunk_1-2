import { configureStore } from "@reduxjs/toolkit";
import serviceAddReducer from '../reducers/serviceAddSlice';
import serviceListReduser from '../reducers/serviceListSlice';
import { applyMiddleware, compose, } from "redux";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    serviceAdd: serviceAddReducer,
    serviceList: serviceListReduser,
  },
  composedEnhancer: compose([applyMiddleware(thunk)]),
  devTools: process.env.NODE_ENV !== 'production',
})
