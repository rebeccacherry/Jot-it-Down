import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import journals from './journals';
import register from './register';
import entries from './entries';
import shops from './shops'
import cart from './cart';


const reducer = combineReducers({
  auth,
  journals,
  register,
  entries,
  shops,
  cart, 
  
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './journals';
export * from './register';
export * from './entries';
export * from './shops'
export * from './cart';
