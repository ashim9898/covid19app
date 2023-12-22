import React from "react";
import {

  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
} from "@chakra-ui/react";
import FormB from "./formB";

const steps = [
 
  { title: "First", description: "Family Details" },
  { title: "Second", description: "Health Status" },
];

const StepB = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Box padding={5}>
      <Stepper size="lg" index={activeStep} >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <FormB />
    </Box>
  );
};

export default StepB;