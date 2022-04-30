import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import Grid from '@mui/material/Grid';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { Paper, makeStyles, Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

//Inpage CSS
const useStyles = makeStyles(theme => ({
  referralContent: {
    margin: theme.spacing(12)
  }
}))

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  color: theme.palette.text.secondary,
}));

function ViewReferralDetails() {
  const classes = useStyles();
  const {id}=useParams();
  const[refData,setRefData]=useState({})
  const status = refData.status;
  const gender = refData.gender;
  const location = refData.referrer_nearest_loc;
  const [submitted, setSubmitted] = useState();
  const [lastUpdated, setLastUpdated] = useState();

  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }



//Query Referral based on ID from URL passed through tableContents
  useEffect(()=>{
    console.log(id);
    axios.get(`http://localhost:3001/referrals/referralinfo/${id}`).then((response) => {
       console.log(response.data);
       setRefData(response.data);
       setSubmitted(response.data.createdAt.slice(0, 10));
       setLastUpdated(response.data.updatedAt.slice(0, 10));
      });
  },[]);
  


//Referrer's button to set picked up
const handleReferrerPickedUp = (id) => {
  //e.preventDefault();
  const updateReferral = { status: 'FULFILLED'}
  axios.put(`http://localhost:3001/referrals/updateReferral/${refData.id}`, updateReferral
  ).then(async (response) => {
    if(response.status = 200){
      window.location.reload();
      window.scrollTo(0, 0)
    } else {
      alert(response.data.error);
    }
  });
}


  return (

    
      <Container className={classes.referralContent} maxWidth="xl">
        {refData?
      <Grid container spacing={2}>
      
        <Grid item xs={12} md={8}>
        <Item elevation={0}>
          <Stack direction="row" spacing={4}>
      <Typography
           className="refNum"
           variant="h5"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           REFERRAL NO. {refData.id}
         </Typography>

         {(() => {
   if(status === 'UNASSIGNED'){
    return <Chip 
       icon={<PersonOffIcon />} 
       size="medium" 
       label="UNASSIGNED" 
        variant="outlined" />;
 } else if(status === 'IN PROGRESS'){
   return <Chip 
      icon={<LoopOutlinedIcon />} 
      color="info" 
      size="medium" 
      label="IN PROGRESS" 
       variant="outlined" />;
 } else if(status === 'AWAITING PICKUP'){
  return <><Chip 
     icon={<AccessTimeIcon />} 
     color="success" 
     size="medium" 
     label="AWAITING PICKUP" 
      variant="outlined" />
      <button className="refAssignButton" onClick={handleReferrerPickedUp}>Already picked up? Click here</button></>;
} else if(status === 'ON HOLD'){
   return <Chip 
      icon={<ErrorIcon />} 
      color="error" 
      size="medium" 
      label="ON HOLD" 
       variant="outlined" />;
 } else if(status === 'FULFILLED'){
   return <Chip 
      icon={<DoneAllOutlinedIcon />} 
      color="success"
      size="medium" 
      label="FULFILLED" />;
 } 
})()}
</Stack>
</Item>
</Grid>
<><Grid item xs={12} md={4}>
  <Item elevation={0}>
     <Stack direction="row" spacing={2}><Typography
     className="refNum"
                variant="h5"
                id="tableTitle"
                component="div"
                fontWeight={600}
              >
                VOLUNTEER:
              </Typography>
              <Typography
                variant="h5"
                id="tableTitle"
                component="div"
                fontWeight={600}
              >
                {refData.volunteer}
              </Typography>      </Stack>
              </Item>
</Grid>
</>

           <Grid item xs={12} md={3}>
          <Item sx={{ minHeight: 125}} elevation={0}>
                 
         <Typography
           sx={{ flex: '1 1 100%', color: "black" }}
           component="div"
           fontWeight={600}
         >
           REFERRER
         </Typography>
               {refData.referrer_fname} {refData.referrer_lname}<br></br>
               {refData.relation}<br></br>
               {refData.referrer_agency}<br></br>
               {refData.referrer_email}<br></br>
               {refData.referrer_phone}
               </Item></Grid>

               <Grid item xs={12} md={3}>
          <Item sx={{ minHeight: 125}} elevation={0}>
         <Typography
           sx={{ flex: '1 1 100%', color: "black"  }}
           component="div"
           fontWeight={600}
         >
           STUDENT INFO
         </Typography>
              <span className="refInf">Student:</span>{refData.student_initials}, {refData.ethnicity} {refData.gender}<br></br>
              <span className="refInf">Teacher:</span>{refData.hr_teacher}, {refData.grade_level} grade<br></br>
              <span className="refInf">Agency:</span>{refData.student_agency}<br></br>
              <span className="refInf">Size Type:</span>{refData.size_type}<br></br>
             </Item></Grid>

             <Grid item xs={12} md={3}>
          <Item sx={{ minHeight: 125}} elevation={0}>

          <Typography
    sx={{ flex: '1 1 100%', color: "black"  }}
    component="div"
    fontWeight={600}
  >
    PICKUP LOCATION
  </Typography>
  Giving Closet Project<br></br>
        <Box sx={{width: "70%"}}>{refData.referrer_nearest_loc}</Box>
        (904) 226-3931<br></br>

</Item></Grid>

<Grid item xs={12} md={3}>
          <Item sx={{border: "1px solid #a8d0e6", minHeight: 123}} elevation={0}>

            {(() => {
if(status === 'FULFILLED'){
  return <>
    
  <Typography
         sx={{ flex: '1 1 100%', color: 'black' }}
         component="div"
         fontWeight={700}
       >
         SUBMITTED
       </Typography>
  <Typography
         sx={{ fontSize: "h6.fontsize"}}
         fontWeight={500}
       >
         {submitted}
       </Typography><br></br>
  <Typography
         sx={{ fontSize: "h6.fontsize", color: "black"}}
         fontWeight={700}
       >
         COMPLETED
       </Typography>
  <Typography
         sx={{ fontSize: "h6.fontsize"}}
         fontWeight={500}
       >
         {lastUpdated}
       </Typography>
  </>
}else {
   return  <>
    
   <Typography
          sx={{ flex: '1 1 100%', color: 'black' }}
          component="div"
          fontWeight={700}
        >
          SUBMITTED
        </Typography>
   <Typography
          sx={{ fontSize: "h6.fontsize"}}
          fontWeight={500}
        >
          {submitted}
        </Typography><br></br>
   <Typography
          sx={{ fontSize: "h6.fontsize", color: "black"}}
          fontWeight={700}
        >
          LAST UPDATED
        </Typography>
   <Typography
          sx={{ fontSize: "h6.fontsize"}}
          fontWeight={500}
        >
          {lastUpdated}
        </Typography>
   </>
 } 
})()}

</Item>
</Grid>


<Grid item xs={12} md={4}>
           <Item  elevation={0}sx={{
          minHeight: 445}}>

<Typography
           sx={{ flex: '1 1 100%', color: 'black' }}
           fontWeight={500}
         >
           STYLE PREFERENCES
         </Typography>
                <Divider/>
                <Stack direction="column" spacing={4} sx={{padding: 2.5}}>
                  {refData.style_pref}
                  </Stack>
                
            
         <Typography
           sx={{ flex: '1 1 100%', color: 'black' }}
           fontWeight={500}
         >
           LIVING STATUS
         </Typography>
         <Divider />
             <Stack direction="column" spacing={4} sx={{padding: 2.5}}>
             {refData.living_status}<br></br>
                 {refData.living_status_note}
             </Stack>
            
                 <Typography
           sx={{ flex: '1 1 100%', color: 'black' }}
           fontWeight={500}
         >
           BACKGROUND
         </Typography>
                <Divider/>
                <Stack direction="column" spacing={4} sx={{padding: 2.5}}>
                <Grid item xs={12} md={12}>
                {refData.background}
                </Grid>
                 
                 </Stack>
           </Item>
           </Grid>
         
           <Grid item xs={12} md={8}>
           <Item  elevation={0}sx={{
          minHeight: 445}}>

            <Typography
           sx={{ flex: '1 1 100%' }}
           fontWeight={500}
         >
           CLOTHING ITEMS
         </Typography>
         <Divider/>
            <Stack direction={{ sm: 'column', md: 'row' }} spacing={0} sx={{padding: 2.5}}>
              <Grid item xs={12} md={4}>
                {refData.outfit_combo}
                </Grid>
                <Grid item xs={12} md={4}>
        Color Bottom(s): <span className='refInputs'>{refData.bottom_color}</span><br></br> 
        Color Top(s): <span className='refInputs'>{refData.top_colors}</span></Grid>
<Grid item xs={12} md={4}>
{(() => {
   if(refData.size_type === 'Mens'){
    return <>
      Pant Waist: <span className='refInputs'>{refData.pant_waist}</span><br></br>
    Pant Length: <span className='refInputs'>{refData.pant_size}</span><br></br>
    Top Size: <span className='refInputs'>{refData.top_size}</span>
    </>
 } else {
   return  <>Bottom Size: <span className='refInputs'>{refData.pant_size}</span><br></br>
 Top Size: <span className='refInputs'> {refData.top_size}</span></>
 } 
})()}
      </Grid></Stack>
<Divider/>

             {(() => {
   if(gender === 'Female'){
    return <><Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}><Grid item xs={12} md={4}>
    Bra:
    </Grid>
    <Grid item xs={12} md={8}>{refData.bra_info}
    
  </Grid></Stack><Divider/></>
 } else {
   return  <>
   </>
 } 
})()}

<Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}>
<Grid item xs={12} md={4}>
               Underwear:
               </Grid>
               <Grid item xs={12} md={8}>{refData.underwear}</Grid>
      </Stack>
<Divider/>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}>
      <Grid item xs={12} md={4}>
               Shoes:
               </Grid>
               <Grid item xs={12} md={8}>{refData.shoe_size}</Grid>
      </Stack>
<Divider/>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}>
      <Grid item xs={12} md={4}>
               Socks:
               </Grid>
               <Grid item xs={12} md={8}>
        {refData.socks}
      </Grid>
              </Stack> 
              <Divider/>
           </Item>
         </Grid>
     
     <Grid item xs={12}>
          <Item elevation={0}>
            <Table>
              <TableHead>
              <TableRow>
             <TableCell>ITEM</TableCell>
             <TableCell>NOTES/DETAILS</TableCell>
           </TableRow>
              </TableHead>
              <TableBody>
              <TableRow >
               <TableCell>
               Hygiene Kit
               </TableCell>
               <TableCell>
        {refData.hygiene_kit}
               </TableCell>
             </TableRow>
             <TableRow >
               <TableCell>
               Hygiene Items
               </TableCell>
               <TableCell>
               {refData.hygiene_items}
               </TableCell>
             </TableRow>

             {(() => {
   if(gender === 'Female'){
    return <TableRow >
    <TableCell>
    Feminine Hygiene
    </TableCell>
    <TableCell>
    {refData.feminine_hygiene}
    </TableCell>
  </TableRow>
 } else {
   return  <>
   </>
 } 
})()}
              <TableRow >
    <TableCell>
    School Supplies
      </TableCell>
    <TableCell>
{refData.school_supplies}
    </TableCell>
  </TableRow>
             
              </TableBody>
            </Table>
          </Item>
        </Grid>
     </Grid>
     :null}
    </Container>
  );
}

export default ViewReferralDetails;