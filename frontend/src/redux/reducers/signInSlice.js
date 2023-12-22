import { createSlice } from "@reduxjs/toolkit";

const initialState= { 
    loggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
     setUserLogin: (state, action) => {
        state.loggedIn = action.payload;
        },
    }
})

export const {setUserLogin} = userSlice.actions;

export default userSlice.reducer;