import {
    Step,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    useSteps,
    StepNumber,
    StepTitle,
    Box,
    StepDescription,
  } from "@chakra-ui/react";
  import FormcUpdate from "./formcUpdate";
  
  const steps = [
    { title: "first", description: "Family Details" },
    { title: "second", description: "Health Status" },
  ];

  function StepC() {
    const { activeStep } = useSteps({
      index: 2,
      count: steps.length,
    });
  
    return (
      <Box padding={5}>
        <Stepper size="lg" index={activeStep}>
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
        <FormcUpdate />
      </Box>
    );
  }
  
  export default StepC;