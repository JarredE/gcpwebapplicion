import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles} from '@material-ui/core';
import ReferralForm from '../components/ReferralForm';

// CSS 
const useStyles = makeStyles(theme => ({
  formContent: {
      marginTop: "-150px",
  }
}))




function NewReferral() {

  const classes = useStyles();




  return (
    <Container className={classes.formContent} maxWidth="xl">
    <>
    <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          

          <ReferralForm />


          
        </Grid>
    </Grid>

    </>
    </Container>
  );
}

export default NewReferral;
