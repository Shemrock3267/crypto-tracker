import {createListenerMiddleware, isAnyOf  } from '@reduxjs/toolkit';
import { setFavorite } from '../slices/appSlice';

export const lsMiddleware = createListenerMiddleware();
lsMiddleware.startListening({
  matcher: isAnyOf(setFavorite),
  effect: (action, listenerApi) => {
    const { app }: any = listenerApi.getState();
    localStorage.setItem(
      'cryptoTracker',
      JSON.stringify({ app })
    );
  }
});

