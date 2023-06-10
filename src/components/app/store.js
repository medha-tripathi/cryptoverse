import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../Services/CryptoApi.js";
import { cryptoNewsApi } from "../Services/CryptoNewsApi.js";

export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat([cryptoApi.middleware,cryptoNewsApi.middleware]),
        
});