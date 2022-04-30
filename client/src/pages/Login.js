import React, { useState, useContext } from "react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import patternBg from "../images/gplay.png"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logo from "../images/email-logo.png"


const useStyles = makeStyles(theme => ({
  loginContent: {
    margin: theme.spacing(20),
    zIndex: 1222
  }
}))

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };


  
  
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("loadingScreen", true);
        localStorage.setItem("logOffScreen", true);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("currentAuthState", response.data.state);
        history.push("/accountmanage");
        window.location.reload(false);
      }
    });
  };





  const register = () => {
        window.location.replace("/Registration");
      };
    




  return (

    <>
    <Container className={classes.loginContent} maxWidth="md" sx={{
        alignItems: "center"
      }}>
        {/* <Box sx={{
        width: '100%',
       //height: '200px',
        backgroundColor: '#fff',
       // borderRadius: "100%",
        padding: 7,
        // marginTop: "-100px",
        // marginLeft: "-100px",
        // display: "flex",
        // position: "absolute",
        zIndex: "-1",
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat"
      }}></Box> */}
    <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={0}
      >
        
    <Box sx={{
        width: '50%',
        height: 'auto',
        backgroundColor: '#fff',
        padding: 7,
      }}>
   <Typography
           sx={{ flex: '1 1 100%', paddingBottom: 2, color: "#86c341" }}
           variant="h5"
           id="loginTitle"
           fontWeight={600}
         >
           Login
         </Typography>

         <Typography
           sx={{ flex: '1 1 100%', paddingBottom: 2}}
           fontWeight={400}
         >
           Welcome back!
         </Typography>

        <Paper
      component="form"
      elevation={0}
      sx={{  display: 'flex', alignItems: 'center', width: '100%' }}
    >
        
        <TextField
          label="Username"
          id="username"
          sx={{ m: 1, width: '100%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AlternateEmailIcon sx={{ p: '10px' , color: '#858585' }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
          }}
          type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        } }
        />
    </Paper>
    <Paper
      component="form"
      elevation={0}
      sx={{  display: 'flex', alignItems: 'center', width: '100%' }}
    >
        
        <TextField
          label="Password"
          id="password"
          sx={{ m: 1, width: '100%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ p: '10px' , color: '#858585' }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /></InputAdornment>,
          }}
          type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        } }
        />
    </Paper>
      <Button color="success" fullWidth={true} size="large" variant="contained" onClick={login}> Login </Button>



    </Box>
    <Box sx={{
        width: '50%',
        height: 'auto',
        backgroundColor: '#86c341',
        padding: 7,
        backgroundImage: `url(${patternBg})`,
        backgroundRepeat: "repeat"
      }}>
        
        <Typography
           sx={{ flex: '1 1 100%', paddingBottom: 4, color: "#fff"}}
           variant="h5"
           fontWeight={600}
         >
           Register
         </Typography>
         <Typography
           sx={{ flex: '1 1 100%', paddingBottom: 1, color: "#fff"}}
           fontWeight={400}
         >
           Create an account to submit and manage student referrals. 
         </Typography>
         <Typography
           sx={{ flex: '1 1 100%', paddingBottom: 2, color: "#fff"}}
           fontWeight={400}
         >
           If you are a parent seeking help for your child, 
           please reach out to the guidance counselor at your child’s school.
         </Typography>
      <Button color="success" fullWidth={true} size="large" variant="contained" onClick={register}> Sign up </Button>



    </Box>
    </Stack>
    </Container>
    </>
  );
}

export default Login;
