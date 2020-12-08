import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

//import logger from 'redux-logger';
import thunk from 'redux-thunk';

import checkerReducer from './checkerSlice';
import trackerReducer from './trackerSlice';
import uiReducer from './uiSlice';
import diaryReducer from './diarySlice';

const reducers = combineReducers({
  ui: uiReducer,
  checker: checkerReducer,
  tracker: trackerReducer,
  diary: diaryReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['tracker', 'diary'],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
