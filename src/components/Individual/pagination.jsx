import React from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Typography,
  Box,
  Button
} from "@material-ui/core";



export const Pagination = ({
  activeStep,
  steps,
  handleReset,
  handleSkip,
  handleSubmitForm,
  handleBack,
  nextDisable
}) => {
  const isStepOptional = (step) => {
    return step === 1;
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
     
        onClick={onClick}
      >Continue</div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        
        onClick={onClick}
        
      > <i className='fa fa-chevron-left'></i> Previous Step</div>
    );
  }

  // if (activeStep === steps.length) {
  //   return (
  //     <React.Fragment>
  //       {/* <Typography sx={{ mt: 2, mb: 1 }}>
  //         All steps completed - you&apos;re finished
  //       </Typography> */}
  //       <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
  //         <Box sx={{ flex: "1 1 auto" }} />
  //         <Button onClick={handleReset}>Reset</Button>
  //       </Box>
  //     </React.Fragment>
  //   );
  // }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          // disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          <i className='fa fa-chevron-left'></i> Previous Step
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        {activeStep === steps.length - 1 && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip this Step
          </Button>
        )}

        { activeStep === 5  && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip this Step
          </Button>
        )}

        { activeStep === 6 && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip this Step
          </Button>
        )}

        {activeStep === steps.length &&
          <Button className="skipbtn MuiButton-colorInherit" type="submit">
            {"Skip this Step"}
          </Button>}
          {console.log("nextDisable",nextDisable)
          }
        <Button className="next-button" type="submit" disabled={nextDisable}>
          {activeStep === steps.length ? "Finish" : "Continue"}
        </Button>
      </Box>
    </React.Fragment>
  );
};
