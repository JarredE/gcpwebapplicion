import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Success = () => {

    

  const handlePrevious = () => {
    window.location.replace("/referral-agreement")
  }

  const handleNext = () => {
    
    window.location.replace("/my-referrals")
  }

  return (
    <Grid>
         <Typography>
             <Box sx={{ fontSize: 'h3.fontSize', m: 1, color: 'green', fontWeight: "600", textAlign: 'center', padding: 2 }}>
                 Thank you for your submission!</Box>
           
           <Box sx={{  m: 1, textAlign: 'center', paddingBottom: 2 }}>We have received your referral and will be processing it soon.
           Be sure to whitelist our email so you don't miss updates on any of your referrals!</Box>
           <Box sx={{  m: 1, textAlign: 'center',fontStyle: 'italic', paddingBottom: 2 }}>info@givingclosetproject.org</Box>
         </Typography>
        <Button
        color='success'
        variant='contained' 
        onClick={handlePrevious}>
            Start Another Referral
    </Button>
        
        <Button
        color='inherit'
        variant='contained' 
        onClick={handleNext}>
        RETURN TO DASHBOARD
    </Button>
    </Grid>

  )
}
export default Success;