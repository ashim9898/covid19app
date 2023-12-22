import {
  Box,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
// import { axiosInstance } from "../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import { MdEvent } from 'react-icons/md';
import { updateProfile } from "../../redux/reducers/profileUpdateSlice";
import { useAxiosInstance } from "../../services/useAxiosInstance";

const MyProfile = () => {

  
  const dispatch = useDispatch()
  const select = useSelector((state) => state.profileupdate);
  const {axiosInstance} = useAxiosInstance()
 
  
  useEffect(() => {
    const getselect = async () => {
     
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user._id;
     
      try{
        const res = await axiosInstance.get(`/get-details/${userId}`,{
        })
        console.log("Krishna", res.data.userDetail)
        if (res.data) {
          const userProfile = res.data.userDetail;
          
          dispatch(updateProfile(userProfile))
        }
      } catch (err) {
        console.log(err);
      }
    };
    getselect();
  }, []);

  return (
   
    <VStack p={10} spacing={10} align="center">
   
    <Heading color="var(--chakra-colors-blue-500);" fontSize="2xl" style={{marginRight:"170px"}}>
      Your Details

    </Heading>
    
      <Flex direction="row" style={{flexWrap:"wrap",justifyContent:"space-between",width:"20vw", height:"50vh"}}>
        <Flex align="center" direction="column">
          <Flex>
          <Box>
            <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>

          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
            First Name
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{select.fullName}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
            <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
            Last Name
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{select.lastName}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdLocationOn size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg">
            Address:
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ textAlign:"center" }}>{select.address}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdPhone size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              Email
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{select.email}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              Gender
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{select.gender}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdEvent size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              DOB
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{select.dob}</span>
        </Flex>        
      </Flex>
        
      
  </VStack>
 
  );
};

export default MyProfile;
