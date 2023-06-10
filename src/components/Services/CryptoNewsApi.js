import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://newsapi.org';

const createRequest = (url)=>({url})

export const cryptoNewsApi = createApi({
reducerPath: 'cryptoNewsApi',
baseQuery: fetchBaseQuery({ baseUrl }),
endpoints: (builder)=>({
getCryptoNews: builder.query({
query: ({newsCategory, count})=>createRequest(`/v2/everything?q=${newsCategory}&publishedAt&apiKey=${process.env.REACT_APP_NEWS_RapidAPI_Key}&count=${count}`),
})
})
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
