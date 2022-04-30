import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import { makeStyles} from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useState } from "react";

// CSS 
const useStyles = makeStyles(theme => ({
  formContent: {
      margin: theme.spacing(8)
  }
}))


function BeginReferral() {

  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }

  const classes = useStyles();
  localStorage.setItem("ReferralFormError", false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const ResumeReferral = () => {
    localStorage.removeItem("savedReferral");
    window.localStorage.setItem("referralStart", true);
    window.location.replace("/submit-referral")
}
  
const BeginReferral = () => {
        window.localStorage.setItem("referralStart", true);
        window.location.replace("./submit-referral")
       

}

const savedReferral = localStorage.getItem("savedReferral");

  return (
    <Container className={classes.formContent} maxWidth="md">
    <>
    <Grid  container spacing={2} >
        <Grid item xs={12} md={12}>

          <Typography>
             <Box sx={{ fontSize: 'h4.fontSize', m: 1, color: 'green', fontWeight: "600", textAlign: 'center', paddingBottom: 2 }}>Refer a Student in Need</Box>
           
           <Box sx={{  m: 1, textAlign: 'center', paddingBottom: 2 }}>We’re here to support you and the students you serve by providing clothing, 
           hygiene, and other basic essentials to low income and homeless youth in need.</Box>
           <Box sx={{  m: 1, fontStyle: 'italic', color: 'black', paddingBottom: 2 }}>*Currently providing emergency, basic needs assistance to youth and school communities in Jacksonville and Palm Beach Florida</Box>
            <Box sx={{  m: 1, paddingBottom: 1}}>Please note that this referral is to be completed only by school/district staff or staff from other Social Service Agencies. 
                This includes teachers, case managers, counselors, social workers, etc. 
                The GCP is the bridge for connecting school communities with clothing, hygiene products and other basic essentials to ensure their low-income and homeless youth have 
                access to these items throughout the school year.</Box>
                <Box sx={{  m: 1, paddingBottom: 3}}>If you are a parent seeking help for your child, please reach out to the guidance counselor at your child’s school.</Box>
         </Typography>
         <FormGroup>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="I have read the above statement" /> 

      {(() => {
   if (savedReferral && !checked){
        return <Button variant="contained" color="info" disabled>
        Resume Referral
      </Button>
   }if (savedReferral){
    return <Button variant="contained" color="info" onClick={ResumeReferral}>
    Resume Referral
  </Button>
}if(!checked){
    return  <Button variant="contained" disabled>
    Start Referral
  </Button>
 } else {
   return  <Button variant="contained" color="success" onClick={BeginReferral}>
   Start Referral
 </Button>
 } 
})()}
    </FormGroup>
        </Grid>
    </Grid>

    </>   
    </Container>
  );
}

export default BeginReferral;
