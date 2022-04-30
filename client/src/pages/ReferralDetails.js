import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { Paper, makeStyles, Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ReferralModal from '../components/ReferralModal';
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

function ReferralDetails() {
  const classes = useStyles();
  const {id}=useParams();
  const[refData,setRefData]=useState({})
  const status = refData.status;
  const gender = refData.gender;
  const location = refData.referrer_nearest_loc;
  const [userData, setUserData] = useState("");
  const [outfit_combo, setOutfitCombo] = useState();
  const [bottom_color, setBottomColor] = useState();
  const [top_colors, setTopColor] = useState();
  const [pant_waist, setPantWaist] = useState();
  const [pant_size, setBottomSize] = useState();
  const [top_size, setTopSize] = useState();
  const [bra_info, setBraInfo] = useState();
  const [bra_size, setBraSize] = useState();
  const [underwear, setUnderwearInfo] = useState();
  const [UnderwearSize, setUnderwearSize] = useState();
  const [shoeInfo, setShoeInfo] = useState();
  const [shoe_size, setShoeSize] = useState();
  const [socks, setSocks] = useState();
  const [hygiene_kit, setHygieneKit] = useState();
  const [hygiene_items, setHygieneItems] = useState();
  const [feminine_hygiene, setFemHygieneItems] = useState();
  const [school_supplies, setSchoolSupplies] = useState();
  const [disabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState();
  const [lastUpdated, setLastUpdated] = useState();

  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }


  function handleDisableClick() {
    setDisabled(!disabled);
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
  
//Modals open and close
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
setOpen(true);
};
const handleClose = () => {
setOpen(false);
};

function refreshPage() {
  window.location.reload();
  window.scrollTo(0, 0)
}

const [alertopen, setAlertOpen] = React.useState(false);

  const handleAlert = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

//Update volunteer and status after assignment
const user = localStorage.getItem("Firstname");
const userN = localStorage.getItem("username");

const handleVolunteerUpdate = (id) => {
  //e.preventDefault();
  const updateReferral = { status: 'IN PROGRESS', volunteer: user, volunteer_user: userN }
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

//Fulfill button function + Fulfill Email function to update referral's record and send email to referrer


    function updateFilledItems(e) {
      //e.preventDefault();
      const updateReferral = { pant_waist: pant_waist, pant_size: pant_size, top_size: top_size,
        outfit_combo: outfit_combo, bottom_color: bottom_color, top_colors: top_colors, bra_info: bra_info, 
        underwear: underwear, shoe_size: shoe_size, socks: socks, hygiene_kit: hygiene_kit, hygiene_items: hygiene_items,
        feminine_hygiene: feminine_hygiene, school_supplies: school_supplies }
      axios.put(`http://localhost:3001/referrals/updateReferral/${id}`, updateReferral
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
      
        <Grid item xs={12} md={8}><Item elevation={0}>
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
  return <Chip 
     icon={<AccessTimeIcon />} 
     color="success" 
     size="medium" 
     label="AWAITING PICKUP" 
      variant="outlined" />;
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
<>
{(() => {
   if(status === 'UNASSIGNED'){
    return <Grid item xs={12} md={4}>
      <Item elevation={0}>
    <Stack direction="row" spacing={2}><Typography
    className="refNum"
               variant="h5"
               component="div"
               fontWeight={600}
             >
               VOLUNTEER:
             </Typography>
             <Typography
             >
               <button className="refAssignButton" onClick={handleVolunteerUpdate}>Assign to me</button>
             </Typography> 
     </Stack>
     </Item>
     </Grid>
   } else {
     return <Grid item xs={12} md={4}>
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
    } 
})()}
</>
         {/* </Stack>
</Grid> */}

          
           <Grid item xs={12} md={3}>
          <Item  elevation={0}>
                 
         <Typography
           sx={{ flex: '1 1 100%', color: 'black' }}
           component="div"
           fontWeight={700}
         >
           REFERRER
         </Typography>
               {refData.referrer_fname} {refData.referrer_lname}<br></br>
               {refData.relation}<br></br>
               {refData.referrer_agency}<br></br>
               {refData.referrer_email}<br></br>
               {refData.referrer_phone}
             </Item>
             </Grid>

             <Grid item xs={12} md={3}>
          <Item sx={{ minHeight: 125}}  elevation={0}>
         <Typography
           sx={{ flex: '1 1 100%', color: 'black' }}
           component="div"
           fontWeight={700}
         >
           STUDENT INFO
         </Typography>
              <span className="refInf">Student:</span>{refData.student_initials}, {refData.ethnicity} {refData.gender}<br></br>
              <span className="refInf">Teacher:</span>{refData.hr_teacher}, {refData.grade_level} grade<br></br>
              <span className="refInf">Agency:</span>{refData.student_agency}<br></br>
              <span className="refInf">Size Type:</span>{refData.size_type}<br></br>
             </Item>
             </Grid>

             <Grid item xs={12} md={3}>
          <Item sx={{ minHeight: 125}}  elevation={0}>

          <Typography
    sx={{ flex: '1 1 100%', color: 'black' }}
    component="div"
    fontWeight={700}
  >
    PICKUP LOCATION
  </Typography>
        Giving Closet Project<br></br>
        <Box sx={{width: "70%"}}>{refData.referrer_nearest_loc}</Box>
        (904) 226-3931<br></br>
</Item>
</Grid>
<Grid item xs={12} md={3}>
          <Item sx={{border: "1px solid #a8d0e6", minHeight: 123}}  elevation={0}>

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
           <Item sx={{
          minHeight: 445}}  elevation={0}>

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
           <Item sx={{
          minHeight: 445}}  elevation={0}>


<Grid item xs={12} md={12} sx={{textAlign: "right"}}>
               {(() => {
   if(disabled){
    return <button className="editbtn" onClick={handleDisableClick}> EDIT ITEMS <EditIcon sx={{fontSize: "14pt", marginBottom: "-3px"}} /></button>
 } else {
   return  <button className="editbtn" onClick={handleDisableClick}> LOCK IN EDITS <LockIcon sx={{fontSize: "14pt", marginBottom: "-3px"}} /></button>
 } 
})()}
                 </Grid>

            <Typography
           sx={{ flex: '1 1 100%' }}
           fontWeight={500}
         >
           CLOTHING ITEMS
         </Typography>
         <Divider/>
            <Stack direction={{ sm: 'column', md: 'row' }} spacing={0} sx={{padding: 1}}>
              <Grid item xs={12} md={4}>
                <textarea
        className='refItemInputs'
        type="text"
        rows={2}
        disabled={disabled}
        defaultValue={refData.outfit_combo}
        onChange={e => setOutfitCombo(e.target.value)}
      />
                </Grid>
                <Grid item xs={12} md={4}>
        <label htmlFor="bottomColor">Color Bottom(s):</label>
        <input
        className='refInputs'
        type="text"
        id='bottomColor'
        name='bottomColor'
        disabled={disabled}
        defaultValue={refData.bottom_color}
        onChange={e => setBottomColor(e.target.value)}
      /><br></br>
      <label htmlFor="topColor">Color Top(s):</label>
        <input
        className='refInputs'
        type="text"
        id='topColor'
        name='topColor'
        disabled={disabled}
        defaultValue={refData.top_colors}
        onChange={e => setTopColor(e.target.value)}
      /></Grid>
<Grid item xs={12} md={4}>
{(() => {
   if(refData.size_type === 'Mens'){
    return <><label htmlFor="waistSize">Pant Waist:</label>
    <input
    className='refInputs'
    type="text"
    id='waistSize'
    name='waistSize'
    disabled={disabled}
    defaultValue={refData.pant_waist}
    onChange={e => setPantWaist(e.target.value)}
  /><br></br><label htmlFor="bottomSize">Pant Length:</label>
    <input
    className='refInputs'
    type="text"
    id='bottomSize'
    name='bottomSize'
    disabled={disabled}
    defaultValue={refData.pant_size}
    onChange={e => setBottomSize(e.target.value)}
  /><br></br>
  <label htmlFor="topSize">Top Size:</label>
    <input
    className='refInputs'
    type="text"
    id='topSize'
    name='topSize'
    disabled={disabled}
    defaultValue={refData.top_size}
    onChange={e => setTopSize(e.target.value)}
  /></>
 } else {
   return  <><label htmlFor="bottomSize">Bottom Size:</label>
   <input
   className='refInputs'
   type="text"
   id='bottomSize'
   name='bottomSize'
   disabled={disabled}
   defaultValue={refData.pant_size}
   onChange={e => setBottomSize(e.target.value)}
 /><br></br>
 <label htmlFor="topSize">Top Size:</label>
   <input
   className='refInputs'
   type="text"
   id='topSize'
   name='topSize'
   disabled={disabled}
   defaultValue={refData.top_size}
   onChange={e => setTopSize(e.target.value)}
 /></>
 } 
})()}
      </Grid></Stack>
<Divider/>

             {(() => {
   if(gender === 'Female'){
    return <><Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}><Grid item xs={12} md={4}>
    Bra:
    </Grid>
    <Grid item xs={12} md={8}>
<input
id='bra'
className='refItemInputs'
type="text"
disabled={disabled}
defaultValue={refData.bra_info}
onChange={e => setBraInfo(e.target.value)}
/>
    
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
               <Grid item xs={12} md={8}>
               <input
        className='refItemInputs'
        type="text"
        disabled={disabled}
        defaultValue={refData.underwear}
        onChange={e => setUnderwearInfo(e.target.value)}
      /></Grid>
      </Stack>
<Divider/>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}>
      <Grid item xs={12} md={4}>
               Shoes:
               </Grid>
               <Grid item xs={12} md={8}>
        <input
        className='refItemInputs'
        type="text"
        disabled={disabled}
        defaultValue={refData.shoe_size}
        onChange={e => setShoeSize(e.target.value)}
      /></Grid>
      </Stack>
<Divider/>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{padding: 2.5}}>
      <Grid item xs={12} md={4}>
               Socks:
               </Grid>
               <Grid item xs={12} md={8}>
        <input
        className='refItemInputs'
        type="text"
        disabled={disabled}
        defaultValue={refData.socks}
        onChange={e => setSocks(e.target.value)}
      /></Grid>
              </Stack> 
              <Divider/>
           </Item>
         </Grid>
     
     <Grid item xs={12} md={6}>
          <Item  elevation={0} sx={{
          minHeight: 420}}>
            <Table>
              <TableHead>
              <TableRow>
             <TableCell>SUPPLY ITEMS</TableCell>
             <TableCell>NOTES/DETAILS</TableCell>
           </TableRow>
              </TableHead>
              <TableBody>
              <TableRow >
               <TableCell>
               Hygiene Kit
               </TableCell>
               <TableCell>
        <input
        className='refItemInputs'
        type="text"
        disabled={disabled}
        defaultValue={refData.hygiene_kit}
        onChange={e => setHygieneKit(e.target.value)}
      />
               </TableCell>
             </TableRow>
             <TableRow >
               <TableCell>
               Hygiene Items
               </TableCell>
               <TableCell>
               <textarea
        className='refItemInputs3'
        rows={3}
        type="text"
        disabled={disabled}
        defaultValue={refData.hygiene_items}
        onChange={e => setHygieneItems(e.target.value)}
      />
               </TableCell>
             </TableRow>

             {(() => {
   if(gender === 'Female'){
    return <TableRow >
    <TableCell>
    Feminine Hygiene
    </TableCell>
    <TableCell>
    <textarea
        className='refItemInputs'
        rows={3}
        type="text"
        disabled={disabled}
        defaultValue={refData.feminine_hygiene}
        onChange={e => setFemHygieneItems(e.target.value)}
/>
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
<textarea
className='refItemInputs3'
rows={3}
type="text"
disabled={disabled}
defaultValue={refData.school_supplies}
onChange={e => setSchoolSupplies(e.target.value)}
/>
    </TableCell>
  </TableRow>
  </TableBody>
            </Table>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item  elevation={0} sx={{
          minHeight: 420}}>
                  <Typography
           className="refNum"
           sx={{ flex: '1 1 100%' }}
           variant="h5"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           STAFF NOTES
         </Typography>
         <Box
      sx={{
        maxWidth: '100%',
        height: 200,
        padding: 2,
        marginTop: 3,
        backgroundColor: '#f8f8f8'
      }}
    >
              <span className='staffNotes'>{refData.status_note}</span>
               </Box><br></br>

               {(() => {
                 if(status === "UNASSIGNED") {
                  return <Button color="info" variant="outlined"  onClick={handleVolunteerUpdate}>Assign Referral to ME</Button>
                }
   else if(userN != refData.volunteer_user){
    return <Button
    color="error"
    variant="outlined">
      THIS REFERRAL IS ASSIGNED TO {refData.volunteer}
    </Button>;
 } 
 else {
   return  <ReferralModal 
   key={refData.id} 
   referral_info={refData} 
   handleClickOpen={ handleClickOpen}
   updateFilledItems={updateFilledItems}
   refreshPage={refreshPage}
   handleAlert = {handleAlert}
   />
 } 
})()}


               
          </Item>
        </Grid>
     </Grid>
     :null}
    </Container>
  );
}

export default ReferralDetails;