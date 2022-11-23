
//funkcjnalnosc do fetchowania danych z uzyciem redux toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_COIN_KEY.toString(),
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getSingleCrypto: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history/?timePeriod=${timeperiod}`),
    }),
    getCryptoExchanges: builder.query({
      query: () => createRequest("/coin/Qwsogvtv82FCd/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetSingleCryptoQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApi;
