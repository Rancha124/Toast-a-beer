import loadMoreReducer from "./loadMoreReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({ loadMoreReducer: loadMoreReducer });
export default allReducers;
// with the help of combineReducers we have have multiple reducers so that this code
// be scalable.
