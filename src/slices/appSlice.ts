import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TransformedCoinData } from '../types/api';

export type AppState = {
  coins: TransformedCoinData[],
  favorites: string[];
};

const initialState: AppState = {
  coins: [],
  favorites: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCoins: (state, { payload }) => {
      state.coins = payload;
    },
    setFavorite: (state, { payload: coinId }: PayloadAction<string>) => {
      const isFavorite = state.favorites.includes(coinId);
    
      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== coinId);
      } else {
        state.favorites.push(coinId);
      }
    },
  }
});

export const { setCoins, setFavorite } = appSlice.actions;
export default appSlice.reducer;