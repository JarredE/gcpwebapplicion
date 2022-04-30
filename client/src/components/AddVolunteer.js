import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

//CSS


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddVolunteer() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function onButtonClickHandler() {
    window.alert('Successfully Added');
        setOpen(false);
  };



  const initialValues = {
    username: "",
    password: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Phonenumber: "",
    PhoneProvider:"",
    Notification: "Email",
    Agency: "The Giving Closet Project",
    Agency_zipcode: "32208",
    nearest_location: "8801 Lake Placid Dr E. Jacksonville, FL. 32208",
    role: "Volunteer",
    avatar: "",
    num_assigned: "",
    num_held: "",
    num_completed: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    Firstname: Yup.string().min(2).max(15).required(),
    Lastname: Yup.string().min(2).max(20).required(),
    Email: Yup.string().min(3).max(30).required(),
    Phonenumber: Yup.string().min(4).max(30).required(),
    Notification: Yup.string().min(3).max(30).required(),
    Agency: Yup.string().min(3).max(30).required(),
    Agency_zipcode: Yup.string().min(5).max(5).required(),
    nearest_location: Yup.string().min(4).max(120).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    })
  };
    

  return (
    <div>
      <Button  onClick={handleClickOpen}>
        ADD NEW
      </Button>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        open={open} 
        style={{padding: 50}}
      >
        <BootstrapDialogTitle  onClose={handleClose}>
          Add new volunteer
        </BootstrapDialogTitle>
        <DialogContent dividers>
       
        
        <Form >
        <Stack spacing={1} direction="column" style={{paddingBottom: 20}}>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Enter Username..."
            style={{height: "30px"}}
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Enter Password..."
            style={{height: "30px"}}
          />
          <label>Firstname: </label>
          <ErrorMessage name="Firstname" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Firstname"
            placeholder="Enter Firstname..."
            style={{height: "30px"}}
          />

          <label>Lastname: </label>
          <ErrorMessage name="Lastname" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Lastname"
            placeholder="Enter Lastname..."
            style={{height: "30px"}}
          />
          <label>Email: </label>
          <ErrorMessage name="Email" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Email"
            placeholder="Enter Email..."
            style={{height: "30px"}}
          />

          <label>Phonenumber: </label>
          <ErrorMessage name="Phonenumber" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Phonenumber"
            placeholder="Enter Phonenumber..."
            style={{height: "30px"}}
          />

          <ErrorMessage name="PhoneProvider" component="span" />
          <Field
            autoComplete="off"
            hidden
            id="inputCreatePost"
            name="PhoneProvider"
            placeholder="(Enter Cell Provider...)"
          />

<ErrorMessage name="Notification" component="span" />
          <Field
            autoComplete="off"
            hidden
            id="inputCreatePost"
            name="Notification"
            placeholder="(Email or text...)"
          />

          <label>Agency/School: </label>
          <ErrorMessage name="Agency" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Agency"
            placeholder="Enter your agency..."
            style={{height: "30px"}}
          />

          <label>Agency Zipcode: </label>
          <ErrorMessage name="Agency_zipcode" component="span" style={{color: "red"}}/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="Agency_zipcode"
            placeholder="Enter Zipcode..."
            style={{height: "30px"}}
          />
</Stack>

<ErrorMessage name="nearest_location" component="span" />
          <Field
            autoComplete="off"
            hidden
            id="inputCreatePost"
            name="nearest_location"
            placeholder="(Duval or Palm Coast...)"
          />
          <ErrorMessage name="role" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="role"
            hidden
          />

          <button class="button" onClick={onButtonClickHandler} type="submit"> Add</button>

        </Form>
    
    
        </DialogContent>
      </BootstrapDialog>
      </Formik>
    </div>
  );
//}
}
