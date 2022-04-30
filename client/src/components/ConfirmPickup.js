import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

const ConfirmPickup = ({refID}) => {
  
  const confirmPickup = () => {
    const updateReferral = { status: 'FULFILLED' }
      axios.put(`http://localhost:3001/referrals/updateReferral/${refID}`, updateReferral
      ).then(async (response) => {
        window.location.reload();
      window.scrollTo(0, 0)
        if(response.status = 200){
        } else {
          alert(response.data.error);
        }
      });
    }

    return (
        
        <>

<Button variant="contained" onClick={confirmPickup} color='success'><CheckIcon /></Button>
        </>
    );
  
}

export default ConfirmPickup;