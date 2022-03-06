import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducers from "./authReducers";
import { IAuthReducers } from "./authReducers/type";

export interface IAllReducers {
  auth: IAuthReducers;
}

const allReducers = combineReducers<IAllReducers>({
  auth: authReducers
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
