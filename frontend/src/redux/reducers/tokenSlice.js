import { createSlice } from "@reduxjs/toolkit";

const initialState= { 
    accessToken: '',
    expirationTime:'',
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            },
        setExpirationTime:(state,action)=>{
            state.token  = action.payload;
        },
    }
})

export const {setToken, setExpirationTime} = tokenSlice.actions;

export default tokenSlice.reducer;