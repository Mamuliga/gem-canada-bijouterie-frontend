import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    createBlacklistFilter('apiReducer', [
      'preciousAllData',
      'semipreciousAllData',
      'eventsData'
    ]),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
