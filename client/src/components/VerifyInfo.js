import React from 'react';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack'
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    
})


const VerifyInfo = () => {

    const classes = useStyles();
    const Fname = localStorage.getItem("Firstname");
    const Lname = localStorage.getItem("Lastname");
    const EmailAdd = localStorage.getItem("Email");
    const PhoneNum = localStorage.getItem("Phonenumber");
    const PhoneProv = localStorage.getItem("PhoneProvider");
    const refAgency = localStorage.getItem("Agency");
    const refAgencyZip = localStorage.getItem("Agency_zipcode");
    const refNearest = localStorage.getItem("nearest_location");
    const Notification = localStorage.getItem("Notification");
    const [phoneProvider, setPhoneProvider] = useState('');
    const [Locations, setAddresses] = useState([]);

    // //store to localStorage until form is submitted
    
    const [referrerInfoValues, setReferrerInfoValues] = useState({});
    const referrerData = window.localStorage.getItem("ReferrerInfo")
    const savedReferrerValues = JSON.parse(referrerData);


    const [referrer_fname, setReferrerFirst] = useState('');
    const handlesetReferrerFirst = (event) => {
        setReferrerFirst(event.target.value);
    };
    const [referrer_lname, setReferrerLast] = useState('');
    const handlesetReferrerLast = (event) => {
      setReferrerLast(event.target.value);
    };
    const [referrer_email, setReferrerEmail] = useState('');
    const handlesetReferrerEmail = (event) => {
      setReferrerEmail(event.target.value);
    };
    const [referrer_phone, setReferrerPhone] = useState('');
    const handlesetReferrerPhone = (event) => {
      setReferrerPhone(event.target.value);
    };
    const [referrer_agency, setReferrerAgency] = useState('');
    const handlesetReferrerAgency = (event) => {
      setReferrerAgency(event.target.value);
    };
    const [referrer_agencyzip, setReferrerAgencyZip] = useState('');
    const handlesetReferrerAgencyZip = (event) => {
      setReferrerAgencyZip(event.target.value);
    };

    console.log(referrer_fname);

    useEffect(() => {
      const getAddresses = () => {
        axios.get(`http://localhost:3001/locations/all-locations`).then((response) => {  
          setAddresses(response.data);
        }).catch(error => console.error('Error:' + error));
      };
      getAddresses();
    }, []);
    

    const handleSetProvider = (event) => {
      setPhoneProvider(event.target.value);
    };

    const [nearestLocation, setNearestLocation] = React.useState('');

    const handleSetNearestLocation = (event) => {
      setNearestLocation(event.target.value);
    };

    const [notificationPreference, setNotificationPreference] = React.useState('');
    
    const handleSetNotificationPreference = (event) => {
      setNotificationPreference(event.target.value);
    };

    const resumeReferrerInfo = localStorage.getItem("resumeReferrerInfo");
    useEffect (() => {
      
      const saveReferrerValues = {referrerInfoValues,referrer_fname, referrer_lname, referrer_email, referrer_phone,
         phoneProvider, referrer_agency, referrer_agencyzip, nearestLocation, notificationPreference}
      localStorage.setItem("ReferrerInfo", JSON.stringify(saveReferrerValues));

      localStorage.setItem("resumeReferrerInfo", true);

    });
    useEffect(() => {
if(resumeReferrerInfo === "true") {
      setReferrerInfoValues(savedReferrerValues.referrerInfoValues);
      setReferrerFirst(savedReferrerValues.referrer_fname);
      setReferrerLast(savedReferrerValues.referrer_lname);
      setReferrerEmail(savedReferrerValues.referrer_email);
      setReferrerPhone(savedReferrerValues.referrer_phone);
      setPhoneProvider(savedReferrerValues.phoneProvider);
      setReferrerAgency(savedReferrerValues.referrer_agency);
      setReferrerAgencyZip(savedReferrerValues.referrer_agencyzip);
      setNearestLocation(savedReferrerValues.nearestLocation);
      setNotificationPreference(savedReferrerValues.notificationPreference);
}
    }, []);

    // email validation
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(referrer_email.match(emailFormat) || referrer_email === "") {
      var emailErrorState = false;
    } else {
      var emailErrorState = true;
    }

    // phone validation
    var phoneLength = /^\d{10}$/;
    if(referrer_phone.match(phoneLength) || referrer_phone === "") {
      var phoneErrorState = false;
    } else {
      var phoneErrorState = true;
    }

if(emailErrorState || phoneErrorState){
  localStorage.setItem("ReferralFormError", true);
}

if(!emailErrorState && !phoneErrorState) {
  localStorage.setItem("ReferralFormError", false);
}
    

    return (
        <div>
            <Typography variant='h5' fontWeight={400} style={{padding: "50px", textAlign: "center"}}>
                Verify your info hasn't changed
            </Typography>
            <form>
            <Stack spacing={3} direction="row" >
                <TextField
                label="First Name"
                variant="outlined"
                value={referrer_fname ? referrer_fname : Fname}
                onChange={handlesetReferrerFirst}
                style={{width: "50%", paddingBottom: "25px"}}
                InputProps={{
                    classes: {
                       root: classes.root,
                       focused: classes.focused,
                       notchedOutline: classes.notchedOutline
                    }
                 }}
                />
                <TextField
                label="Last Name"
                variant="outlined"
                value={referrer_lname ? referrer_lname : Lname}
                onChange={handlesetReferrerLast}
                style={{width: "50%", paddingBottom: "25px"}}

                />
                </Stack>
                <Stack spacing={0} direction="column" >
                <TextField
                error={emailErrorState}
                label="Email Address"
                variant="outlined"
                value={referrer_email ? referrer_email : EmailAdd}
                onChange={handlesetReferrerEmail}
                style={{width: "100%", paddingBottom: "25px"}}
                />
                {(() => {
   if(emailErrorState){
    return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Invalid email address</FormHelperText>
 } else {
   return  <></>
 } 
})()}
                </Stack>
                <Stack spacing={3} direction="row" >
                <Stack spacing={3} direction="column" >
                <TextField
                error={phoneErrorState}
                label="Phone Number"
                variant="outlined"
                value={referrer_phone ? referrer_phone : PhoneNum}
                onChange={handlesetReferrerPhone}
                style={{width: "100%", paddingBottom: "25px"}}
                />

{(() => {
   if(phoneErrorState){
    return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Invalid phone number</FormHelperText>
 } else {
   return  <></>
 } 
})()}
</Stack>
                <FormControl sx={{ width: "33%", paddingBottom: "25px"}}>
        <InputLabel id="phone-provider-label">Phone Provider</InputLabel>
        <Select
          labelId="phone-provider-label"
          id="phone-provider"
          value={phoneProvider ? phoneProvider : PhoneProv}
          label="Phone Provider"
          fullWidth
          onChange={handleSetProvider}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value='Non-Cellular'>Not Listed or Landline</MenuItem>
          <MenuItem value='@txt.att.net'>AT&T</MenuItem>
          <MenuItem value='@comcastpcs.textmsg.com'>Comcast</MenuItem>
          <MenuItem value='@mms.cricketwireless.net'>Cricket Wireless</MenuItem>
          <MenuItem value='@msg.fi.google.com'>Google Project Fi</MenuItem>
          <MenuItem value='@mymetropcs.com'>Metro PCS</MenuItem>
          <MenuItem value='@sprintpaging.com'>Sprint</MenuItem>
          <MenuItem value='@tmomail.net'>T-Mobile</MenuItem>
          <MenuItem value='@vtext.com'>Verizon</MenuItem>
        </Select>
      </FormControl>

      {(() => {
   if(phoneProvider === 'Non-Cellular'){
    return <FormControl sx={{ width: "33%", paddingBottom: "25px"}}>
    <InputLabel id="preferred-contact-label">Preferred Contact</InputLabel>
    <Select
      labelId="preferred-contact-label"
      id="preferred-contact"
      value="Email"
      defaultValue=""
      label="Preferred Contact"
      disabled
      fullWidth
      onChange={handleSetNotificationPreference}
      MenuProps={{ disableScrollLock: true }}
    >
      <MenuItem value='Email'>Email</MenuItem>
      <MenuItem value='Phone'>Phone</MenuItem>
      <MenuItem value='Both'>Both</MenuItem>
    </Select>
  </FormControl>
 } else {
   return  <FormControl sx={{ width: "33%", paddingBottom: "25px"}}>
   <InputLabel id="preferred-contact-label">Preferred Contact</InputLabel>
   <Select
  
     labelId="preferred-contact-label"
     id="preferred-contact"
     value={notificationPreference ? notificationPreference : Notification}
     label="Preferred Contact"
     fullWidth
     onChange={handleSetNotificationPreference}
     MenuProps={{ disableScrollLock: true }}
   >
     <MenuItem value='Email'>Email</MenuItem>
     <MenuItem value='Phone'>Phone</MenuItem>
     <MenuItem value='Both'>Both</MenuItem>
   </Select>
 </FormControl>
 } 
})()}
                </Stack>
                <Stack spacing={3} direction="row" >
                <TextField
                label="Agency"
                variant="outlined"
                value={referrer_agency ? referrer_agency : refAgency}
                onChange={handlesetReferrerAgency}
                style={{width: "40%", paddingBottom: "25px"}}
                />
                <TextField
                label="Zipcode"
                variant="outlined"
                value={referrer_agencyzip ? referrer_agencyzip : refAgencyZip}
                onChange={handlesetReferrerAgencyZip}
                style={{width: "20%", paddingBottom: "25px"}}

                />
                <FormControl sx={{ width: "40%", paddingBottom: "25px"}}>
        <InputLabel id="nearest-location-label">Closest Location</InputLabel>
        <Select
          labelId="nearest-location-label"
          id="nearest-location"
          value={nearestLocation ? nearestLocation : refNearest}
          label="Closest Location"
          fullWidth
          onChange={handleSetNearestLocation}
          MenuProps={{ disableScrollLock: true }}
        >
          {Locations.map((Locations) => (
        <MenuItem key={Locations.index} value={Locations.name + ", " + Locations.address + ", " + Locations.county}>{Locations.name} - {Locations.address}, {Locations.county}</MenuItem>
      ))}
        </Select>
      </FormControl>
                </Stack>
            </form>
        </div>
    )
}

export default VerifyInfo;