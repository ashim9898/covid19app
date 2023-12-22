import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  group: "",
  address: "",
  phone: "",
  gender: "",
  dob: "",
  email: "",
  covidstatus: "",
  vaccineStatus:"",
  quarantine:"",
  infectedDays:"",
  
 
};

export const StepperhandleData = createSlice({
  name: "stepperdatahandling",
  initialState,
  reducers: {
   
    secondstepformcompleted: (state, action) => {
      
      state.fullname = action.payload.fullname;
      state.group = action.payload.group;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
    },
    updateformcompleted:(state,action)=>{
      state.fullname = action.payload.fullName;
      state.group = action.payload.groupName;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
      state.covidstatus = action.payload.covidStatus;
      state.vaccineStatus = action.payload.vaccineStatus;
      state.quarantine = action.payload.quarantine;
      state.infectedDays=action.payload.infectedDays;
      
    },
    clearform:(state)=>{
      state.fullname = '';
      state.group = '';
      state.address = '';
      state.phone = '';
      state.gender = '';
      state.dob = '';
      state.email = '';
      state.covidstatus = '';
      state.vaccineStatus = '';
      state.infectedDays='';
      
    }
  
  },
});

// Action creators are generated for each case reducer function
export const { firststepformcompleted, secondstepformcompleted, updateformcompleted,clearform} =
  StepperhandleData.actions;

export default StepperhandleData.reducer;
