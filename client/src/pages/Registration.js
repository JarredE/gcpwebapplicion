import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyIcon from '@mui/icons-material/Key';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import RegistrationAgreement from '../components/RegistrationAgreement'
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";


//Inpage CSS
const useStyles = makeStyles(theme => ({
  registrationContent: {
    display: "fixed"
  }
}))



function Registration() {
  const classes = useStyles();

  const registerbg = document.getElementById('registration');

  registerbg.classList.add('available');


  const login = () => {
    window.location.replace("/login");
  };

  

  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().min(3).max(15).required(),
  //   password: Yup.string().min(4).max(20).required(),
  //   Firstname: Yup.string().min(3).max(15).required(),
  //   Lastname: Yup.string().min(4).max(20).required(),
  //   Email: Yup.string().min(3).max(30).required(),
  //   Phonenumber: Yup.string().min(4).max(30).required(),
  //   Notification: Yup.string().min(3).max(30).required(),
  //   Agency: Yup.string().min(3).max(30).required(),
  //   Agency_zipcode: Yup.string().min(5).max(5).required(),
  //   nearest_location: Yup.string().min(4).max(30).required(),
  // });

  const [referrer_fname, setReferrerFirst] = useState('');
    const [referrer_lname, setReferrerLast] = useState('');
    const [referrer_email, setReferrerEmail] = useState('');
    const [referrer_phone, setReferrerPhone] = useState('');
    const [referrer_agency, setReferrerAgency] = useState('');
    const [referrer_agencyzip, setReferrerAgencyZip] = useState('');
    const [phoneProvider, setPhoneProvider] = useState('');
    const [Locations, setAddresses] = useState([]);
    const [userError, setUserError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [bothError, setBothError] = React.useState('');

  //agreements
  const [termsAgreement, setTermsAgreement] = React.useState(false);

  const handleSetTermsAgreement  = (event) => {
    setTermsAgreement(event.target.checked);
  };

    useEffect(() => {
      const getAddresses = () => {
        axios.get(`http://localhost:3001/locations/all-locations`).then((response) => {  
          setAddresses(response.data);
        }).catch(error => console.error('Error:' + error));
      };
      getAddresses();
    }, []);
    

    const handleSetEmail = (event) => {
      setReferrerEmail(event.target.value)
    };

    const handleSetUsername = (event) => {
      setUsername(event.target.value);
    };

    // const handleEmailKeyPress = (e) => {
    //   var key = e.key;
    //   if (key == "Backspace") {
    //     setEmailError("")
    // }
    // console.log(key + " was pressed")
    // }

    // const handleUsernameKeyPress = (e) => {
    //   var key = e.key;
    //   if (key == "Backspace") {
    //     setEmailError("")
    // }
    // }



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

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleWelcomeEmail() {
      
      try {
        await axios.post("http://localhost:3001/welcome-email", {
          email: referrer_email,
          subject: "Nice, You've Successfully Registered!",
          //text: text,
          firstname: referrer_fname,
          username: username,
          password: password
        })
      } catch (error) {
        console.log(error)
      }
    }
    console.log(userError)
  const register = () => {

    if (notificationPreference === "" ){
      setNotificationPreference("Email");
    }
    const data = {username: username, password: password, Firstname: referrer_fname, Lastname: referrer_lname, Email: referrer_email,
    Phonenumber: referrer_phone, PhoneProvider: phoneProvider, Notification: notificationPreference, Agency: referrer_agency, Agency_zipcode: referrer_agencyzip,
  nearest_location: nearestLocation, role: "Referrer", }

    axios.post("http://localhost:3001/auth", data).then((response) => {
      if(response.data.error === "Username already in use!"){
        setUserError(response.data.error);
      } else if(response.data.error === "Email already in use!"){
        setEmailError(response.data.error);
      } else if(response.data.error === "Both username and email are already in use!"){
        setBothError(response.data.error);
      } else {
        handleWelcomeEmail();
        window.alert('Succsefully Registered');
        window.location.replace("/Login");
      }
    });
  };


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


//check for any errors to disable register button
if(emailErrorState || phoneErrorState){
  var disabled = true;
}

//if no errors, set disabled to false to enable register button
if(!emailErrorState && !phoneErrorState) {
  var disabled = false;
}

//create boolean variable check to display message if any fields are empty
if(referrer_phone === "" || referrer_email === "" || referrer_fname === "" || referrer_lname === "" 
|| referrer_agency === "" || referrer_agencyzip === "" || nearestLocation === ""
|| phoneProvider === "" || username === "" || password === "") {
  var disabled = true;
  var emptiesExist = true;
} else {
  var disabled = false;
  var emptiesExist = false;
}



  return (

    <><>
    {/* <Box sx={{ width: "100%", textAlign: "center" }}>
       <img  src={loginBg} />
    </Box> */}
    </>
    <Container className={classes.registrationContent} maxWidth="md" sx={{ alignItems: "center" }}>

        <Stack
          direction={{ sm: 'column', md: 'row' }}
          spacing={0}
        >
          <Box sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#fff',
            padding: 7,
          }}>
            <Typography>
              <Box sx={{ flex: '1 1 100%', fontSize: "h5.fontSize", paddingBottom: 1, color: "#86c341" }}
                variant="h5"
                fontWeight={600}
              >
                Registration
              </Box>

              <Box sx={{ flex: '1 1 100%', paddingBottom: 5 }}>
                Create an account to submit and manage your student referrals
              </Box>

            </Typography>

            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0}
            >
              <TextField
                label="First Name"
                id="firstname"
                value={referrer_fname}
                sx={{ m: 1, width: '50%' }}
                type="text"
                onChange={(event) => {
                  setReferrerFirst(event.target.value);
                } } />

              <TextField
                label="Last Name"
                id="lastname"
                value={referrer_lname}
                sx={{ m: 1, width: '50%' }}
                type="text"
                onChange={(event) => {
                  setReferrerLast(event.target.value);
                } } />
            </Stack>
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0}
            >

              <TextField
                label="Phone Number"
                id="phone"
                value={referrer_phone}
                sx={{ m: 1, width: '30%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ p: '10px', color: '#858585' }} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
                }}
                type="text"
                onChange={(event) => {
                  setReferrerPhone(event.target.value);
                } } />
              <TextField
                label="Email"
                id="email"
                value={referrer_email}
                sx={{ m: 1, width: '70%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AlternateEmailIcon sx={{ p: '10px', color: '#858585' }} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
                }}
                type="text"
                onChange={handleSetEmail }
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" || e.key != "Enter") {
                    setEmailError("");
                    setBothError("");
                  }
          }}
                 />
            </Stack>
            {(() => {
   if(phoneErrorState && emailErrorState){
    return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>Invalid phone number and email address</FormHelperText>
  } else if(emailErrorState){
    return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>Invalid email address</FormHelperText>
 } else if(phoneErrorState){
  return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>Invalid phone number</FormHelperText>
} else if(emailError === "Email already in use!"){
  return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>This Email is already in use!</FormHelperText>
}  else {
   return  <></>
 } 
})()}

            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0}
            >

              <TextField
                label="Agency / School"
                id="agency"
                value={referrer_agency}
                sx={{ m: 1, width: '75%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ p: '10px', color: '#858585' }} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
                }}
                type="text"
                onChange={(event) => {
                  setReferrerAgency(event.target.value);
                } } />
              <TextField
                label="Agency Zipcode"
                id="zipcode"
                value={referrer_agencyzip}
                sx={{ m: 1, width: '25%' }}
                type="text"
                onChange={(event) => {
                  setReferrerAgencyZip(event.target.value);
                } } />
            </Stack>

            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0}
            >

              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="nearest-location-label">Nearest Giving Closet Project Location</InputLabel>
                <Select
                  labelId="nearest-location-label"
                  id="nearest-location"
                  value={nearestLocation}
                  label="Nearest Giving Closet Project Location"
                  fullWidth
                  onChange={handleSetNearestLocation}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {Locations.map((Locations) => (
                    <MenuItem key={Locations.index} value={Locations.name + ", " + Locations.address + ", " + Locations.county}>{Locations.name} - {Locations.address}, {Locations.county}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>This will be your care package pickup location.</FormHelperText>
              </FormControl>
            </Stack>

            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0}
            >

              {(() => {
                if (phoneProvider === 'Non-Cellular') {
                  return <FormControl sx={{ m: 1, width: "50%" }}>
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
                  </FormControl>;
                } else {
                  return <FormControl sx={{ m: 1, width: "50%" }}>
                    <InputLabel id="preferred-contact-label">Preferred Contact</InputLabel>
                    <Select
                      labelId="preferred-contact-label"
                      id="preferred-contact"
                      value={notificationPreference}
                      label="Preferred Contact"
                      fullWidth
                      onChange={handleSetNotificationPreference}
                      MenuProps={{ disableScrollLock: true }}
                    >
                      <MenuItem value='Email'>Email</MenuItem>
                      <MenuItem value='Phone'>Phone</MenuItem>
                      <MenuItem value='Both'>Both</MenuItem>
                    </Select>
                  </FormControl>;
                }
              })()}

              <FormControl sx={{ m: 1, width: "50%" }}>
                <InputLabel id="phone-provider-label">Phone Provider</InputLabel>
                <Select
                  labelId="phone-provider-label"
                  id="phone-provider"
                  value={phoneProvider}
                  label="Phone Provider"
                  fullWidth
                  onChange={handleSetProvider}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value='Non-Cellular'>Non-Cellular/Landline</MenuItem>
                  <MenuItem value='@txt.att.net'>AT&T</MenuItem>
                  <MenuItem value='@comcastpcs.textmsg.com'>Comcast</MenuItem>
                  <MenuItem value='@mms.cricketwireless.net'>Cricket Wireless</MenuItem>
                  <MenuItem value='@msg.fi.google.com'>Google Project Fi</MenuItem>
                  <MenuItem value='@mymetropcs.com'>Metro PCS</MenuItem>
                  <MenuItem value='@sprintpaging.com'>Sprint</MenuItem>
                  <MenuItem value='@tmomail.net'>T-Mobile</MenuItem>
                  <MenuItem value='@vtext.com'>Verizon</MenuItem>
                </Select>
                <FormHelperText>We'll need this if you'd like text updates. (Optional)</FormHelperText>
              </FormControl>
            </Stack>

            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={0} 
            >

              <TextField
                label="Username"
                id="username"
                value={username}
                sx={{ m: 1, width: '50%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon sx={{ p: '10px', color: '#858585' }} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
                }}
                type="text"
                onChange={handleSetUsername }
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" || e.key != "Enter") {
                    setUserError("");
                    setBothError("");
                  }
          }}
                 />

              <TextField
                label="Password"
                id="password"
                value={password}
                sx={{ m: 1, width: '50%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><KeyIcon sx={{ p: '10px', color: '#858585' }} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
                }}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                } } />
            </Stack>
            {(() => { 
              if(bothError === "Both username and email are already in use!"){
  return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>Both username and email are already in use!</FormHelperText>
}
  else if(userError === "Username already in use!"){
  return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>This Username is already in use!</FormHelperText>
} else {
   return  <></>
 } 
})()}
            {(() => {
   if(emptiesExist){
    return  <FormHelperText style={{color: "red", marginLeft: "10px", marginBottom: "10px"}}>Please fill out all fields!</FormHelperText>
 } else {
   return  <></>
 } 
})()}

            <Stack spacing={3} direction={{ sm: 'column', md: 'row' }}>
              <Box sx={{ fontStyle: 'italic',paddingTop: 5, paddingBottom: 7, display: "inline" }}>
                <RegistrationAgreement />
                <FormControlLabel
                  control={<Checkbox checked={termsAgreement} onChange={handleSetTermsAgreement} />} label="I have read and agree to the above service terms." /></Box>

            </Stack>

            {(() => {

              if (termsAgreement) {
                return <Button disabled={disabled} color="success" size="large" variant="contained" onClick={register}> Register </Button>;
              } else {
                return <Button disabled color="error" size="large" variant="contained"> Register </Button>;
              }
            })()}


            <Button color="success" sx={{ backgroundColor: "#86c341" }} size="large" variant="contained" onClick={login}> Return to Login </Button>



          </Box>
        </Stack>
      </Container></>
  );
}

export default Registration;
