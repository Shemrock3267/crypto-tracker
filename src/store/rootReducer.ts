import { combineReducers } from '@reduxjs/toolkit';

import { trackerApi } from '../api/api';
import appReducer from '../slices/appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  [trackerApi.reducerPath]: trackerApi.reducer,
});

export default rootReducer;