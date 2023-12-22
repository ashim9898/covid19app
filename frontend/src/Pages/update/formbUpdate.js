import React from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  HStack,
  RadioGroup,
  Radio,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { secondstepcompleted } from "../../redux/reducers/stepperHandleSlice";
import { secondstepformcompleted } from "../../redux/reducers/stepperHandleData";
import { useDispatch, useSelector } from "react-redux";

const FormbUpdate = () => {
  const select = useSelector((state) => state.stepperformhander);
  const dob = select.dob ? select.dob.split('T')[0] : '';
  
  const formik1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: `${select.fullname}`,
      group: `${select.group}`,
      address:`${select.address}`,
      phone: `${select.phone}`,
      gender: select.gender || "",
      dob: dob,
      email: `${select.email}`,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Required"),
      group: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.number().min(10).positive().integer().required("Required"),
      dob: Yup.date().required("Required"),
      email: Yup.string().email(),
    }),
    onSubmit: (values) => {
      const data = { ...values };
      dispatch(secondstepformcompleted(data));
      dispatch(secondstepcompleted());
    },
  });

  const dispatch = useDispatch();

 
 

  return (
    <Formik
      initialValues={formik1.initialValues}
      validationSchema={formik1.validationSchema}
    >
      <form onSubmit={formik1.handleSubmit}>
        <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
          <VStack spacing={2} align="flex-start">
            <Heading color="var(--chakra-colors-blue-500);">
              Family Details
            </Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={3}>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik1.errors.fullname && formik1.touched.fullname
                }
              >
                <FormLabel>First name</FormLabel>
                <Field
                  as={Input}
                  name="fullname"
                  placeholder="First name"
                  value={formik1.values.fullname}
                  onChange={formik1.handleChange}
                />
                <FormErrorMessage>{formik1.errors.fullname}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik1.errors.group && formik1.touched.group
                }
              >
                <FormLabel>Group</FormLabel>
                <Field
                  as={Input}
                  name="group"
                  placeholder="Group"
                  onChange={formik1.handleChange}
                  value={formik1.values.group}
                />
                <FormErrorMessage>{formik1.errors.group}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <FormControl
              isInvalid={formik1.errors.address && formik1.touched.address}
            >
              <FormLabel alignSelf="flex-start">Address</FormLabel>
              <Field
                as={Input}
                name="address"
                placeholder="Enter your address"
                onChange={formik1.handleChange}
                value={formik1.values.address}
              />
              <FormErrorMessage>{formik1.errors.address}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik1.errors.phone && formik1.touched.phone}
            >
              <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
              <Field
                as={Input}
                name="phone"
                placeholder="Enter your phone number"
                onChange={formik1.handleChange}
                value={formik1.values.phone}
              />
              <FormErrorMessage>{formik1.errors.phone}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.gender && formik1.touched.gender}
            >
              <FormLabel>Gender</FormLabel>
              <RadioGroup defaultValue={formik1.values.gender} onChange={formik1.handleChange}>
                <HStack spacing="24px">
                  <Field
                    as={Radio}
                    name="gender"
                    value="Male"
                    onChange={formik1.handleChange}
                  >
                    Male
                  </Field>
                  <Field
                    as={Radio}
                    name="gender"
                    value="Female"
                    onChange={formik1.handleChange}
                  >
                    Female
                  </Field>
                </HStack>
              </RadioGroup>
              <FormErrorMessage>{formik1.errors.gender}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.dob && formik1.touched.dob}
            >
              <FormLabel>Date Of Birth</FormLabel>
              <Field
                as={Input}
                name="dob"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                onChange={formik1.handleChange}
                value={formik1.values.dob}
               
              />
              <FormErrorMessage>{formik1.errors.dob}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.email && formik1.touched.email}
            >
              
              <div style={{ width: 800 }}></div>
              <FormErrorMessage>{formik1.errors.email}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme="blue" onClick={formik1.handleNext}>
            Next
          </Button>
        </VStack>
      </form>
    </Formik>
  );
};

export default FormbUpdate;