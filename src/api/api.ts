import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoinData, TransformedCoinData } from '../types/api';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const trackerApi = createApi({
  reducerPath: 'trackerApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getAllCoins: builder.query<TransformedCoinData[], void>({
      query: () => '/coins/markets?vs_currency=usd&order=market_cap_desc',
      transformResponse: (response: CoinData[]) => {
        return response.map((coin) => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
        }));
      },
    })
  })
});

export const {
  useGetAllCoinsQuery,
} = trackerApi;
