import React, { Component} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import pdflogo from "../images/email-logo.png"
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

const ViewReferral = (refID, referrer_fname, referrer_lname, 
  status, outfit_combo, bottom_color, top_colors, pant_size, 
  top_size, bra_info, underwear, shoe_size, socks, hygiene_kit, 
  hygiene_items, feminine_hygiene, school_supplies, student_initials, 
  student_agency, referrer_email, referrer_phone, relation, updatedAt ) => {
  

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const referralID = refID.refID;

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 4000);
    }
  };

  const createAndDownloadPdf = () => {
    axios.post('http://localhost:3001/create-pdf', refID, referrer_fname, referrer_lname, 
    status, outfit_combo, bottom_color, top_colors, pant_size, 
    top_size, bra_info, underwear, shoe_size, socks, hygiene_kit, 
    hygiene_items, feminine_hygiene, school_supplies, student_initials, 
    student_agency, referrer_email, referrer_phone, relation, updatedAt, pdflogo)
      .then(() => axios.get('http://localhost:3001/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob,`Referral_ID#${referralID}.pdf`);
      })
  }

    return (
        
        <>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={() => {
            handleButtonClick();
            createAndDownloadPdf();
            }}
        >
           save {success ? <CheckIcon /> : <FileDownloadIcon />}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
        </>
    );
  
}

export default ViewReferral;