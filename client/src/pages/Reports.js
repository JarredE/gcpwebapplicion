import React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import DateAdapter from '@mui/lab/AdapterMoment';
import FormControl from '@mui/material/FormControl';
import FullReportGen from '../components/FullReportGen';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
//import MobileDatePicker from '@mui/lab/MobileDatePicker';
//import moment from 'moment';
import { Paper, makeStyles} from '@material-ui/core';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';





 
// CSS for Paper component
const useStyles = makeStyles(theme => ({
    reportContent: {
        margin: theme.spacing(8)
    }
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  }));

  

//Main component function
export default function Reports(){  
    const classes = useStyles();
    const [fromValue, setFromValue] = React.useState(new Date());
    const [toValue, setToValue] = React.useState(new Date());
    const [reportType, setReportType] = React.useState('');

    const referralredirect = localStorage.getItem("referralStart");

    if(referralredirect === "true"){
        window.location.replace("/submit-referral");
    }
  

  const handleSetReport = (event) => {
    setReportType(event.target.value);
  };


         
    return(

      <Container className={classes.reportContent} maxWidth="xl">
          {/* <LocalizationProvider dateAdapter={moment}> */}
        <>
        <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item> 
          <Typography> 
              <Box style={{ paddingBottom: 5, fontWeight: "600"}}>
                  Quick Report
                  </Box>
                  <Box style={{paddingBottom: 20, fontWeight: "300"}}>
                    Download all items in the database for your selected report in plain text CSV format</Box>
              </Typography>
            <Stack direction={{ sm: 'column', md: 'row' }}
              spacing={0}>
              
          <FormControl  sx={{ width: '100%' }}>
        <InputLabel id="report-type-label">Report Type</InputLabel>
        <Select
          labelId="report-type-label"
          id="report-type"
          value={reportType}
          label="Report Type"
          fullWidth
          onChange={handleSetReport}
        >
          <MenuItem value='Student'>Student Report</MenuItem>
          <MenuItem value='referrer'>Referrer Report</MenuItem>
          <MenuItem value='volunteer'>Volunteer Report</MenuItem>
          <MenuItem value='full'>Full Report</MenuItem>
        </Select>
      </FormControl>

      {(() => {
  if(reportType === "full"){
    return  <FullReportGen/>
} if(reportType === "volunteer"){
  return  <FullReportGen/>
} if(reportType === "referrer"){
  return  <FullReportGen/>
} if(reportType === "student"){
  return  <FullReportGen/>
} else {
   return <FullReportGen/>
 } 
})()}

      

      {/* <MobileDatePicker
          label="For mobile"
          value={fromValue}
          onChange={(newFromValue) => {
            setFromValue(newFromValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </Stack>
          </Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>
              
          </Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={12} md={12}>
          <Item>

        </Item></Grid>
        </Grid>
        </>
        {/* </LocalizationProvider> */}
        </Container>
    )
};