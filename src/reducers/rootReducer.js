import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import filterReducer from './filterReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  apiReducer,
  filterReducer,
  pageReducer,
});
