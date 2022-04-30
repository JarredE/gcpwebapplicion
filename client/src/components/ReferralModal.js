import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {makeStyles} from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


//CSS
const useStyles = makeStyles(theme => ({
    modalButton: {
        height: 35,
        width: 60
    }
}))

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

export default function ReferralModal({referral_info,updateFilledItems,refreshPage, handleAlert}) {
    //Needed variables here for style and email functions
    const classes = useStyles();
   // const [sent, setSent] = useState(false);
    const [text, setText] = useState('');
    const emailAddress = referral_info.referrer_email;
    const phoneAddress = referral_info.referrer_phone + referral_info.referrer_provider;

const pickuplocation = referral_info.referrer_nearest_loc;

//Fulfill button function + Fulfill Email function to update referral's record and send email to referrer
async function handleFulfillSend() {
  //setSent(true)

  try {
    await axios.post("http://localhost:3001/fulfilled-email", {
      email: emailAddress,
      subject: "Good News! Your Referral is Ready",
      text: text,
      firstname: referral_info.referrer_fname,
      referralID: referral_info.id,
      student_initials: referral_info.student_initials,
      pickuplocation: pickuplocation
    })
  } catch (error) {
    console.log(error)
  }
}

async function handleFulfillSMSSend() {
  //setSent(true)

  try {
    await axios.post("http://localhost:3001/fulfilled-text", {
      email: phoneAddress,
      subject: "Good News, " + referral_info.referrer_fname + "!",
      text: "Referral #" + referral_info.id + " with The Giving Closet Project has been completed and is now ready for pickup. " 
      + "A copy of your completed referral can be downloaded from your account. Your pickup location is:  " + pickuplocation,
      firstname: referral_info.referrer_fname,
      referralID: referral_info.id,
      student_initials: referral_info.student_initials,
      pickuplocation: pickuplocation
    })
  } catch (error) {
    console.log(error)
  }
}

//Status change buttons
    function handlePending(e) {
      //e.preventDefault();
      const updateReferral = { status: 'AWAITING PICKUP', status_note: status_note, }
      axios.put(`http://localhost:3001/referrals/updateReferral/${referral_info.id}`, updateReferral
      ).then(async (response) => {
        if(response.status = 200){
          window.location.reload();
          window.scrollTo(0, 0)
        } else {
          alert(response.data.error);
        }
      });
    }

    function handleHold(e) {
      //e.preventDefault();
      const updateReferral = { status: 'ON HOLD', status_note: status_note, }
      axios.put(`http://localhost:3001/referrals/updateReferral/${referral_info.id}`, updateReferral
      ).then(async (response) => {
        if(response.status = 200){
          window.location.reload();
          window.scrollTo(0, 0)
        } else {
          alert(response.data.error);
        }
      });
    }

    function handleRemoveHold(e) {
      //e.preventDefault();
      const updateReferral = { status: 'IN PROGRESS', status_note: status_note, }
      axios.put(`http://localhost:3001/referrals/updateReferral/${referral_info.id}`, updateReferral
      ).then(async (response) => {
        if(response.status = 200){
          window.location.reload();
          window.scrollTo(0, 0)
        } else {
          alert(response.data.error);
        }
      });
    }

    function handleUnassign(e) {
      //e.preventDefault();
      const updateReferral = { status: 'UNASSIGNED', status_note: status_note, volunteer: '', volunteer_user: '' }
      axios.put(`http://localhost:3001/referrals/updateReferral/${referral_info.id}`, updateReferral
      ).then(async (response) => {
        if(response.status = 200){
          window.location.reload();
          window.scrollTo(0, 0)
        } else {
          alert(response.data.error);
        }
      });
    }
console.log(referral_info.referrer_notification)
    function handleFulfill(e) {
      //e.preventDefault();
      const updateReferral = { status: 'FULFILLED', status_note: status_note, }
      axios.put(`http://localhost:3001/referrals/updateReferral/${referral_info.id}`, updateReferral
      ).then(async (response) => {
        window.location.reload();
        window.scrollTo(0, 0)
        if(response.status = 200){
        } else {
          alert(response.data.error);
        }
      });
    }
    
  const [status_note, setStatus_Note] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.modalButton} color="success" size="sm" variant="contained" onClick={handleClickOpen}>
        UPDATE REFERRAL
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="confirm-fulfillment"
        open={open} 
      >
        <BootstrapDialogTitle id="confirm-fulfillment" onClose={handleClose}>
          What would you like to do with this referral? 
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography
          className="refModalBody"
          sx={{ flex: '1 1 100%' }}
          component="div"
        >
          You are about to change the status of this referral. 
          An email of the status change will be sent to the referrer. 
          In the boxes below, you may enter important comments to be included in the email or staff notes. 
          For example: "We apologize, but some items in your referral were not available. 
          Please see the fulfilled items in the attached confirmation"
        </Typography>
        <br></br>
        <Typography
           fontWeight={600}
         >
           READY FOR PICKUP:
         </Typography>
         <Typography
         >
           Finished bagging. Sends a "ready for pick up" email to the referrer. 
         </Typography>
         <br></br>
         <Typography
           fontWeight={600}
         >
           PLACE ON HOLD:
         </Typography>
         <Typography
         >
           Find a discrepancy? Sends a "hold" email to the referrer. Be sure to note the reason in "volunteer comments".
         </Typography>
         <br></br>
         <Typography
           fontWeight={600}
         >
           UNASSIGN:
         </Typography>
         <Typography
         >
           Removes you from this referral to allow someone else to work on it (No email is sent).
         </Typography>
         <br></br>
         <Typography
           fontWeight={600}
         >
           COMPLETE FULFILLMENT:
         </Typography>
         <Typography
         >
           Closes out this referral once the care package has been picked up or delivered (No email is sent).
         </Typography>
         <br></br>
         <Stack spacing={3} direction="row" >
        <TextField
          id="staff-notes"
          label="Internal Staff Notes"
          multiline
          rows={4}
          style={{ width: '50%' }}
          onChange={e => setStatus_Note(e.target.value)}
        />
        
        <TextField
          value={text}
          label="Volunteer Comments to Referrer"
          multiline
          rows={4}
          style={{ width: '50%' }}
          onChange={(e) => setText(e.target.value)}
        />
        </Stack>
        </DialogContent>
        <DialogActions>

        {(() => {
   if (referral_info.status === 'IN PROGRESS' && referral_info.referrer_notification === 'Phone'){
    return <Button 
    color="primary"
    type='submit'
    size="sm" 
    variant="contained" 
    onClick={() => {
    handleFulfillSMSSend();
    handlePending();
    updateFilledItems();
    }}>
        READY FOR PICKUP
      </Button>;
 } else if (referral_info.status === 'IN PROGRESS' && referral_info.referrer_notification === 'Both'){
  return <Button 
  color="info"
  type='submit'
  size="sm" 
  variant="contained" 
  onClick={() => {
  handleFulfillSMSSend();
  handleFulfillSend();
  handlePending();
  updateFilledItems();
  }}>
      READY FOR PICKUP
    </Button>;
} else if (referral_info.status === 'AWAITING PICKUP'){
  return <Button 
  color="success"
  type='submit'
  size="sm" 
  variant="contained" 
  onClick={
  handleFulfill}>
      Complete Fulfillment 
    </Button>;
} else if (referral_info.status === 'IN PROGRESS' && referral_info.referrer_notification === 'Email') {
   return <Button 
   color="info"
   type='submit'
   size="sm" 
   variant="contained" 
   onClick={() => {
   handleFulfillSend();
   handlePending();
   updateFilledItems();
   }}>
       READY FOR PICKUP
     </Button>;
 } 
})()}

          {(() => {
   if(referral_info.status === 'ON HOLD'){
    return <Button 
    color="warning" 
    size="sm" 
    variant="outlined" 
    onClick={() => {
      handleRemoveHold();
      handleAlert();
      }}>
        Remove Hold
      </Button>;
 } else {
   return <Button 
   color="warning" 
   size="sm" 
   variant="contained" 
   onClick={() => {
    handleHold();
    handleAlert();
    }}>
       Place on Hold
     </Button>;
 } 
})()}

{(() => {
   if(referral_info.status != 'UNASSIGNED'){
    return <Button 
    color="info"
    size="sm" 
    variant="contained" 
    onClick={handleUnassign}>
      Unassign
      </Button>;
 }  
})()}

          
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
