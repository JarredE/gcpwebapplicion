import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


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

export default function RegistrationAgreement() {
    const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="refAssignButton" color="error" variant="contained" onClick={handleClickOpen}>
        Read GCP Service Terms
      </button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="cancel-referral"
        open={open} 
      >
        <BootstrapDialogTitle id="confirm-fulfillment" onClose={handleClose}>
         System Usage Agreement
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography
          className="refModalBody"
          sx={{ flex: '1 1 100%' }}
          component="div"
        >
          <Box sx={{fontWeight: 600, paddingBottom: 1, textAlign: "center", fontSize: "11pt"}}>
            System Purpose
          </Box>
          <Box sx={{fontStyle: "italic", fontSize: "10pt", paddingBottom: 2}}>
          Referrals are to be completed by school/district staff or staff from other Social Service Agencies. 
          This includes: teachers, case managers, counselors, social workers, etc. The GCP is the bridge for connecting school communities 
          with clothing, hygiene products and other basic essentials to ensure their low-income and homeless youth have access to these items 
          throughout the school year. If you are a parent seeking help for your child, please reach out to the guidance counselor at your child’s school.
          </Box>
          <Box sx={{fontWeight: 600, paddingBottom: 1, textAlign: "center", fontSize: "11pt"}}>
            Our Data, Your Integrity
          </Box>
          <Box sx={{fontStyle: "italic", fontSize: "10pt", paddingBottom: 2}}>
            Insert terms here
          </Box>
        </Typography>
    
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
//}
}
