/* eslint-disable quotes */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducers from './authReducers';
import loadReducers from './loadReducers';
import { IAuthReducers } from './authReducers/type';
import { ILoadReducers } from './loadReducers/type';

export interface IAllReducers {
  auth: IAuthReducers;
  loading: ILoadReducers;
}

const allReducers = combineReducers<IAllReducers>({
  auth: authReducers,
  loading: loadReducers
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
