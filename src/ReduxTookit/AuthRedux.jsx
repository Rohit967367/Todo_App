import { createSlice } from "@reduxjs/toolkit"

const storage = localStorage.getItem("token")
const Auth = createSlice({
    name: 'authentication',
    initialState: {
        isAuth: false,
        idToken: storage
    },
    reducers: {
        login(state, action) {
            state.idToken = localStorage.setItem("token", action.payload)
            if (!state.idToken) {
                state.isAuth = true
            }
        },
        // userLogin(state) {
        // },

        logout(state) {
            state.idToken = localStorage.removeItem("token")
            state.isAuth = false
        }
    }
})



export const AuthAction = Auth.actions

export default Auth