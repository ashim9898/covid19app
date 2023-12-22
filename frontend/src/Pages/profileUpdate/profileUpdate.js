import React, { useEffect } from "react";
// import { axiosInstance } from "../../services/axiosInstance";
import * as Yup from "yup";
import {useSelector, useDispatch} from 'react-redux'
import {
    FormControl,
    Input,
    FormLabel,
    VStack,
    Heading,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    RadioGroup,
    Radio,
    FormErrorMessage,
  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Field, Formik, useFormik } from "formik";
import { updateProfile } from "../../redux/reducers/profileUpdateSlice";
import { useAxiosInstance } from "../../services/useAxiosInstance";
const ProfileUpdate = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  
  const select=useSelector((state) => state.profileupdate);
  const {axiosInstance} = useAxiosInstance()
 
  
  
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const id = user._id;
  
 
  
  
 

  useEffect(()=>{
    const fetchData = async()=>{
    
       
     
      try{
        const res = await axiosInstance.get(`/get-details/${id}`)
        if (res.data.userDetail) {
          const userProfile = res.data.userDetail
          dispatch(updateProfile(userProfile))
          
        }
      }catch(err){
        console.log(err)
      } 
    }
    fetchData()
  },[])
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: `${select.fullName}`,
      lastName: `${select.lastName}`,
      address: `${select.address}`,
      email: `${select.email}`,
      // phone: select.phone || "",
      // gender: select.gender || "",
    },
    validationSchema: Yup.object({
    }),
    onSubmit: async (values) => {
      try {
        const updatedData = {
          fullName: values.fullName,
          lastName: values.lastName,
          address: values.address,
          email: values.email,
         
        
        };

        const response = await axiosInstance.put(
          `http://localhost:5000/edit-profile/${id}`,
          updatedData
        );
        if(response){
            dispatch(updateProfile(updatedData))
            navigate('/profile')
        }

       
      } catch (err) {
        console.error(err);
      }
    },
  });




  return(
    <div>
        <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        enableReinitialize={true}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
            <VStack spacing={2} align="flex-start">
              <Heading color="var(--chakra-colors-blue-500);">
                Your Details
              </Heading>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={3}>
              <GridItem colSpan={1}>
                <FormControl
                  isInvalid={
                    formik.errors.fullName && formik.touched.fullName
                  }
                  style={{width: "600px"}}
                >
                  <FormLabel>First name</FormLabel>
                  <Field
                    as={Input}
                    name="fullName"
                    placeholder="First name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl
                  isInvalid={formik.errors.lastName && formik.touched.lastName}
                >
                  <FormLabel>Group</FormLabel>
                  <Field
                    as={Input}
                    name="lastName"
                    placeholder="group"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <FormControl
                isInvalid={formik.errors.address && formik.touched.address}
              >
                <FormLabel alignSelf="flex-start">Address</FormLabel>
                <Field
                  as={Input}
                  name="address"
                  placeholder="Enter your address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel alignSelf="flex-start">Email</FormLabel>
                <Field
                  as={Input}
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

             
            </SimpleGrid>
            <Button type="submit" colorScheme="blue">
              Update
            </Button>
          </VStack>
        </form>
      </Formik>
    </div>
  );
};

export default ProfileUpdate;
