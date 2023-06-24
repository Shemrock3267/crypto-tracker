import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import rootReducer from './rootReducer';
import { lsMiddleware } from './lsmiddleware';

import { trackerApi } from '../api/api';

const serializedState = JSON.parse(localStorage.getItem('cryptoTracker') || 'null');

const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM({ serializableCheck: false })
    .concat(trackerApi.middleware)
    .concat(lsMiddleware.middleware),
  preloadedState: serializedState || {}
});

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export default store;

