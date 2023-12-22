import { configureStore } from '@reduxjs/toolkit'
import stepperhandlerreducer from '../reducers/stepperHandleSlice';
import stepperformdatahandling from '../reducers/stepperHandleData'
import ProfileUpdateSlice from '../reducers/profileUpdateSlice';
import userSlice from '../reducers/signInSlice'
import tokenSlice from '../reducers/tokenSlice';
export const store = configureStore({
  reducer: {

    stepperhandling:stepperhandlerreducer,
    stepperformhander:stepperformdatahandling,
    profileupdate: ProfileUpdateSlice,
    login: userSlice,
    token:tokenSlice,
  },
})

