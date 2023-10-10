//---------------------------------- creating store -----------------------//
import { configureStore } from "@reduxjs/toolkit";
//---------------------------------- Auth Reducer -------------------------//
import { authReducer } from "./Redux/Reducers/authReducer";
//---------------------------------- Product Reducer ----------------------//
import { productReducer } from "./Redux/Reducers/productReducer";



//---------------------------------- creating reducers -------------------//
export const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
    }
})