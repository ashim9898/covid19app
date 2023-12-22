import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  second: true,
  third: false,
};

export const StepperhandleSlice = createSlice({
  name: "stepperhandling",
  initialState,
  reducers: {
  
    secondstepcompleted: (state) => {
      state.second = false;
      state.third = true;
    },
  
    clearform:(state)=>{
     
      state.second = true;
      state.third = false;
    },
    backfromthirdstep:(state)=>{
      state.second = true;
      state.third = false;

    }
  },
});

// Action creators are generated for each case reducer function
export const {
  secondstepcompleted,
  backfromthirdstep,
  clearform,
} = StepperhandleSlice.actions;

export default StepperhandleSlice.reducer;