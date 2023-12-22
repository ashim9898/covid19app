import React, { useEffect } from "react";

import StepcUpdate from "./stepcUpdate";
// import { axiosInstance } from "../../services/axiosInstance";
import StepBupdate from "./stepbUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  
  updateformcompleted,
} from "../../redux/reducers/stepperHandleData";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../services/useAxiosInstance";




export const MainFormUpdate = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const first = useSelector((state) => state.stepperhandling.first);
  const second = useSelector((state) => state.stepperhandling.second);
  const third = useSelector((state) => state.stepperhandling.third);
  const {axiosInstance} = useAxiosInstance()

  useEffect(()=>{
    const alldata = async()=>{
     
        const email = localStorage.getItem("email");
        try {
          const details = await axiosInstance.get(
            `/families1/${id}`
          );
          if (details) {
            const newdata=details.data.allfamily1;
            dispatch(updateformcompleted({...newdata,...newdata.members[0]}))
            
          }
        } catch (err) {
          console.log(err);
        }
      };
  },[])
  

  return (
    <>
    
      {second && (
        <div>
          <StepBupdate />
        </div>
      )}
      {third && (
        <div>
          <StepcUpdate />
        </div>
      )}
    </>
  );
};