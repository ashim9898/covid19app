import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  // gender: "",
  // dob: "",
 
};

export const ProfileUpdateSlice = createSlice({
  name: "profileupdatehandler",
  initialState,
  reducers: {
  
    updateProfile:(state,action)=>{
      state.fullName = action.payload.fullName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      // state.gender = action.payload.gender;
      // state.dob = action.payload.dob;
      
      
    }
   
  
  },
});

// Action creators are generated for each case reducer function
export const {storeProfile,updateProfile} = ProfileUpdateSlice.actions;

export default ProfileUpdateSlice.reducer;
