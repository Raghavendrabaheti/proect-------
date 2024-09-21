import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { reducer } from './userSlice.js';


const store = configureStore({
    reducer: {
        count : counterReducer,
        user: reducer
    }
});

console.log(store);




export default store;