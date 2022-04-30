import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';


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

export default function EditLocation({locationID,prevCounty, prevName, prevAddress}) {
    const [open, setOpen] = React.useState(false);
    const [county, setCounty] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");

    const handleSetCounty = (event) => {
      setCounty(event.target.value);
    };
    const handleSetName = (event) => {
      setName(event.target.value);
    };
    const handleSetAddress = (event) => {
      setAddress(event.target.value);
    };


function handleUpdate() {
  const id = locationID;
  const updateLocation = {county: county ? county: prevCounty, name: name ? name: prevName, address: address ? address: prevAddress }
   axios.put(`http://localhost:3001/locations/updateLocation/${id}`, updateLocation
   ).then(async (response) => {
     if(response.status = 200){
       window.location.replace("/admin");
      // window.scrollTo(0, 0)
     } else {
       alert(response.data.error);
     }
   });
 }

 function handleDelete() {
  const id = locationID;
   axios.delete(`http://localhost:3001/locations/deletelocation/${id}`).then(async (response) => {
     if(response.status = 200){
       window.location.replace("/admin");
      // window.scrollTo(0, 0)
     } else {
       alert(response.data.error);
     }
   });
 }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
      <Button  onClick={handleClickOpen}>
        EDIT
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="cancel-referral"
        open={open} 
      >
        <BootstrapDialogTitle id="confirm-fulfillment" onClose={handleClose}>
          Edit pickup location
        </BootstrapDialogTitle>
        <DialogContent dividers>
       
        <Stack spacing={3} direction="column" >
                <TextField
                label="County"
                variant="outlined"
                value={county ? county: prevCounty}
                onChange={handleSetCounty}
                style={{width: "100%", paddingBottom: "10px"}}
                />
                <TextField
                label="Agency Name"
                variant="outlined"
                value={name ? name: prevName}
                onChange={handleSetName}
                style={{width: "100%", paddingBottom: "10px"}}
                />
                <TextField
                label="Address"
                variant="outlined"
                value={address ? address: prevAddress}
                onChange={handleSetAddress}
                style={{width: "100%", paddingBottom: "10px"}}
                />
          </Stack>


    
        </DialogContent>
        <DialogActions>
        <Button 
        color="success" 
        size="sm" 
        variant="contained" 
        onClick={handleUpdate}>
            Save
          </Button>
          <Button 
        color="error" 
        size="sm" 
        variant="contained" 
        onClick={handleDelete}>
           Delete
          </Button>
          <Button 
        color="info" 
        size="sm" 
        variant="contained" 
        onClick={handleClose}>
           Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
//}
}
