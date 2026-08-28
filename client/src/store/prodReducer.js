import {createSlice} from '@reduxjs/toolkit'

const prodReducer = createSlice({
    name: 'prod',
    initialState:{
        link: 'http://localhost:8000'
    }
})

export default prodReducer.reducer