import {createSlice} from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'prod',
    initialState:{
        isLoggedIn: false
    },
    reducers:{
        login: (state)=>{state.isLoggedIn = true},
        logout: (state)=>{state.isLoggedIn = false},
    }
})

export const authActions = authReducer.actions
export default authReducer.reducer