import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice.js";
import menuReducer from "./feature/menuSlice.js";

const store = configureStore({
    reducer:{
        auth: authReducer,
        menu: menuReducer
    }
})

export default store;