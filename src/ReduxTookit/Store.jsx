import { configureStore } from "@reduxjs/toolkit";
import Auth from "./AuthRedux";


const Store = configureStore({
    reducer: { auth: Auth.reducer }
})

export default Store