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

export default function AddLocation() {
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

//submit function
function handleSubmit() {
  const location = {county: county, name: name, address: address }
  axios.post(`http://localhost:3001/locations/location`, location
  ).then(async (response) => {
      if(response.status = 200){
        window.location.reload();
        window.scrollTo(0, 0)
      } else {
          alert(response.data.error);
      }
  })
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  onClick={handleClickOpen}>
        ADD NEW
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="cancel-referral"
        open={open} 
      >
        <BootstrapDialogTitle id="confirm-fulfillment" onClose={handleClose}>
          Add new pickup location
        </BootstrapDialogTitle>
        <DialogContent dividers>
       
        <Stack spacing={3} direction="column" >
                <TextField
                label="County"
                variant="outlined"
                defaultValue=""
                value={county}
                onChange={handleSetCounty}
                style={{width: "100%", paddingBottom: "10px"}}
                />
                <TextField
                label="Agency Name"
                variant="outlined"
                defaultValue=""
                value={name}
                onChange={handleSetName}
                style={{width: "100%", paddingBottom: "10px"}}
                />
                <TextField
                label="Address"
                variant="outlined"
                defaultValue=""
                value={address}
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
        onClick={handleSubmit}>
            Save
          </Button>
          <Button 
        color="error" 
        size="sm" 
        variant="contained" 
        onClick={handleClose}>
           Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
//}
}
