import React from 'react';
import BuildPackage from '../components/BuildPackage';
import BuildPackageItems from '../components/BuildPackageItems';
import Button from '@mui/material/Button';
import Confirm from '../components/Confirm';
import Grid from '@mui/material/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StudentInfo from '../components/StudentInfo';
import Success from '../components/Success';
import { useState } from "react";
import VerifyInfo from '../components/VerifyInfo';
import CancelReferral from '../components/CancelReferral';

const useStyles = makeStyles({
    root: {
        width: "50%",
        margin: "6rem auto",
        "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
            color: "#86bd48"
        },
        "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
            color: "green"
        }
    }
})

const ReferralForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    function getSteps() {
        return ["Your Info", "Student Info", "Clothing", "Supplies", "Review & Submit" ];
    }

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep +1)
    }

    function handlePrevious() {
        setActiveStep(prevActiveStep => prevActiveStep -1)
    }

    function handleCancel() {
        localStorage.removeItem("SupplyInfo")
        localStorage.removeItem("ClothingInfo")
        localStorage.removeItem("StudentInfo")
        localStorage.removeItem("ReferrerInfo")
        localStorage.removeItem("referralStart");
        localStorage.setItem("resumeStudentInfo", false);
        localStorage.setItem("resumeClothingInfo", false);
        localStorage.setItem("resumeSupplyInfo", false);
        localStorage.setItem("resumeReferrerInfo", false);
        window.location.replace("/my-referrals")
    }

    function handleSave() {
        localStorage.removeItem("referralStart");
        localStorage.setItem("savedReferral", true);
        window.location.replace("/my-referrals")
    }

    const steps = getSteps();

    

    function getStepsContent(stepIndex) {
        switch(stepIndex) {
            case 0: 
                return <VerifyInfo />;
            case 1:
                return <StudentInfo />;
            case 2:
                return <BuildPackage />;
            case 3:
                return <BuildPackageItems />;
            case 4:
                return <Confirm handleNext={handleNext} 
                handlePrevious={handlePrevious} />;
            default: 
                return handleCancel();
        }
    }

  const classes = useStyles();
console.log(steps[0]);

  return (
<div className={classes.root}>
    <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
              <StepLabel>
                  {label}
              </StepLabel>
          </Step>  
        ))}
    </Stepper>
    
    <>
    {activeStep === steps.length ? <Success /> : (
            <>
        {getStepsContent(activeStep)}
        <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={0}
      >
          <Grid item xs={12} md={8}>
<CancelReferral handleCancel={handleCancel} handleSave={handleSave}/>
      </Grid> 
        <Grid item xs={12} md={4}>
            <>
        {(() => {
         if(activeStep > 0) {

       return <Button
        color='inherit'
        variant='contained' 
        onClick={handlePrevious}>
            Back
    </Button>
}
 })()}
    {(() => {
   if(activeStep === 4){
    return  <>
 </>
 } else {
   return  <Button
   color='success'
   variant='contained' 
   onClick={handleNext}>
   {activeStep === steps.length ? "Finish" : "Next"}
</Button>
 } 
})()}
</>
</Grid>
      </Stack>
    </>
    )}</>
    
</div>
  );
        }
export default ReferralForm;