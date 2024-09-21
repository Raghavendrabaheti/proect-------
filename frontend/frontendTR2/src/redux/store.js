import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { useReducer } from "react";

const store = configureStore({
    reducer: {
        count : counterReducer,
        user: useReducer
    }
});

console.log(store);




export default store;