import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) => ({
        url: `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": process.env.REACT_APP_COIN_KEY.toString(),
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      }),
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
