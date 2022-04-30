import * as React from 'react';
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

export default function CancelReferral ({handleCancel, handleSave}) {
    //Needed variables here for style and email functions
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.modalButton} color="error" variant="contained" onClick={handleClickOpen}>
        EXIT
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="cancel-referral"
        open={open} 
      >
        <BootstrapDialogTitle id="confirm-fulfillment" onClose={handleClose}>
          Are you sure you want to exit this referral? 
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography
          className="refModalBody"
          sx={{ flex: '1 1 100%' }}
          component="div"
        >
          You are about to exit this referral and discard its progress! 
          You can choose to save the information until you log off, or proceed to cancel anyway.
        </Typography>
    
        </DialogContent>
        <DialogActions>



        <Button 
        color="error" 
        size="sm" 
        variant="contained" 
        onClick={handleCancel}>
            Yes, Cancel
          </Button>
          <Button 
        color="info" 
        size="sm" 
        variant="contained" 
        onClick={handleClose}>
            NO, Go Back
          </Button>
          <Button 
        color="success" 
        size="sm" 
        variant="contained" 
        onClick={handleSave}>
            Save & Exit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
//}
}
