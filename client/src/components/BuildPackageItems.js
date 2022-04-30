import React, { Component } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import {makeStyles, styled} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

      

const BuildPackageItems = () => {

   //const referralformerror is for validation alert
   const ReferralFormError = localStorage.getItem("ReferralFormError");

//store to localStorage until form is submitted
  
const [supplyInfoValues, setSupplyInfoValues] = useState({});
const supplyData = window.localStorage.getItem("SupplyInfo")
  const studentInfo = window.localStorage.getItem("StudentInfo")
  const referrerData = window.localStorage.getItem("ReferrerInfo")
  const savedSupplyValues = JSON.parse(supplyData);
  const savedStudentValues = JSON.parse(studentInfo);
  const savedReferrerValues = JSON.parse(referrerData);

    const [gender, setGender] = React.useState("");

    const [bodyKit, setBodyKit] = React.useState(false);

    const handleSetBodyKit  = (event) => {
      setBodyKit(event.target.checked);
    };

    const [dentalKit, setDentalKit] = React.useState(false);

    const handleSetDentalKit  = (event) => {
      setDentalKit(event.target.checked);
    };

    const [lotion, setLotion] = React.useState(false);

    const handleSetLotion  = (event) => {
      if(bodyKit){
        setLotion(false);
      } else
      setLotion(event.target.checked);
    };

    const [deodorant, setDeodorant] = React.useState(false);

    const handleSetDeodorant  = (event) => {
      if(bodyKit){
        setDeodorant(false);
      } else
      setDeodorant(event.target.checked);
    };

    const [floss, setFloss] = React.useState(false);

    const handleSetFloss  = (event) => {
      if(dentalKit){
        setFloss(false);
      } else
      setFloss(event.target.checked);
    };

    const [shampoo, setShampoo] = React.useState(false);

    const handleSetShampoo  = (event) => {
      if(bodyKit){
        setShampoo(false);
      }else
      setShampoo(event.target.checked);
    };

    const [soap, setSoap] = React.useState(false);

    const handleSetSoap  = (event) => {
      if(bodyKit){
        setSoap(false);
      } else
      setSoap(event.target.checked);
    };

    const [toothbrush, setToothbrush] = React.useState(false);

    const handleSetToothbrush  = (event) => {
      if(dentalKit){
        setToothbrush(false);
      } else
      setToothbrush(event.target.checked);
    };

    const [pads, setPads] = React.useState(false);

    const handleSetPads  = (event) => {
      setPads(event.target.checked);
    };


    const [tampons, setTampons] = React.useState(false);

    const handleSetTampons  = (event) => {
      setTampons(event.target.checked);
    };

    const [spiral, setSpiral] = React.useState(false);

    const handleSetSpiral  = (event) => {
      setSpiral(event.target.checked);
    };
    const [backpack, setBackpack] = React.useState(false);

    const handleSetBackpack  = (event) => {
      setBackpack(event.target.checked);
    };
    const [penandpaper, setPen] = React.useState(false);

    const handleSetPen  = (event) => {
      setPen(event.target.checked);
    };
    const [composition, setComposition] = React.useState(false);

    const handleSetComposition  = (event) => {
      setComposition(event.target.checked);
    };
    const [folder, setFolder] = React.useState(false);

    const handleSetFolder  = (event) => {
      setFolder(event.target.checked);
    };
    const [gluestick, setGlue] = React.useState(false);

    const handleSetGlue  = (event) => {
      setGlue(event.target.checked);
    };

    const [nearestLocation, setNearestLocation] = React.useState('');

    const handleSetNearestLocation = (event) => {
      setNearestLocation(event.target.value);
    };

    const resumeSupplyInfo = localStorage.getItem("resumeSupplyInfo");
    useEffect (() => {
      const saveSupplyValues = {bodyKit, dentalKit, lotion, deodorant, floss, shampoo,
      soap, toothbrush, pads, tampons, backpack, penandpaper, composition, folder, gluestick, spiral}
      window.localStorage.setItem("SupplyInfo", JSON.stringify(saveSupplyValues));
      localStorage.setItem("resumeSupplyInfo", true);
    });
    
    useEffect(() => {
      setGender(savedStudentValues.gender);
      setNearestLocation(savedReferrerValues.nearestLocation);
    if(resumeSupplyInfo === "true"){
      // setSupplyInfoValues(savedSupplyValues.supplyInfoValues);
       setBodyKit(savedSupplyValues.bodyKit);
       setDentalKit(savedSupplyValues.dentalKit);
       setLotion(savedSupplyValues.lotion);
       setDeodorant(savedSupplyValues.deodorant);
       setFloss(savedSupplyValues.floss);
       setShampoo(savedSupplyValues.shampoo);
       setSoap(savedSupplyValues.soap);
       setToothbrush(savedSupplyValues.toothbrush);
       setPads(savedSupplyValues.pads);
       setTampons(savedSupplyValues.tampons);
       setBackpack(savedSupplyValues.backpack);
       setPen(savedSupplyValues.penandpaper);
       setComposition(savedSupplyValues.composition);
       setFolder(savedSupplyValues.folder);
       setGlue(savedSupplyValues.gluestick);
       setSpiral(savedSupplyValues.spiral);
    }
     }, []);


    return (
        <div>
            <Typography variant='h5' fontWeight={400} style={{padding: "50px", textAlign: "center"}}>
                Almost there! Complete the package with supplies
                {(() => {
   if(ReferralFormError === "true"){
    return  <FormHelperText style={{color: "red",textAlign: "center"}}>Oops! You have field errors that will prevent submission of this referral!</FormHelperText>
 } else {
   return  <></>
 } 
})()}
            </Typography>
            <form>
              
            <Stack spacing={3} direction="row" >
            <Box sx={{ display: 'flex' , width: "100%"}}>
              <Stack spacing={2} direction="column">
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Hygiene Kits</FormLabel>
        <FormGroup>
        <LightTooltip title="Soap, Shampoo/Conditioner, Lotion (when available)" placement="left">
              <FormControlLabel 
              control={
              <Checkbox checked={bodyKit} onChange={handleSetBodyKit} />
              } label="Body Kit" />
              </LightTooltip>
              <LightTooltip title="Toothbrush, Toothpaste, Floss (when available)" placement="left">
            <FormControlLabel 
              control={
              <Checkbox checked={dentalKit} onChange={handleSetDentalKit} />
              } label="Dental Kit" />
              </LightTooltip>
            </FormGroup>
            </FormControl>
            </Stack>

            <Grid>
            <Stack spacing={2} direction="column">
              <Box>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Hygiene Items</FormLabel>
        <FormGroup>

        {(() => {
   if(bodyKit){
    return  <Box><FormControlLabel 
    disabled
    control={
    <Checkbox onChange={handleSetLotion}/>
    } label="Body Lotion" /></Box>
 } else {
   return  <Box><FormControlLabel 
   control={
   <Checkbox checked={lotion} onChange={handleSetLotion} />
   } label="Body Lotion" /></Box>
 } 
})()}



{(() => {
   if(bodyKit){
    return  <Box><FormControlLabel 
    disabled
    control={
    <Checkbox  onChange={handleSetDeodorant}/>
    } label="Deodorant" /></Box>
 } else {
   return  <Box><FormControlLabel 
   control={
   <Checkbox checked={deodorant} onChange={handleSetDeodorant} />
   } label="Deodorant" /></Box>
 } 
})()}


{(() => {
   if(dentalKit){
    return  <Box> <FormControlLabel 
    disabled
    control={
    <Checkbox  onChange={handleSetFloss} />
    } label="Floss" /></Box>
 } else {
   return  <Box> <FormControlLabel 
   control={
   <Checkbox checked={floss} onChange={handleSetFloss} />
   } label="Floss" /></Box>
 } 
})()}

{(() => {
   if(bodyKit){
    return  <Box><FormControlLabel 
    disabled
    control={
    <Checkbox onChange={handleSetShampoo} />
    } label="Shampoo/Conditioner" /></Box>
 } else {
   return  <Box><FormControlLabel 
   control={
   <Checkbox checked={shampoo} onChange={handleSetShampoo} />
   } label="Shampoo/Conditioner" /></Box>
 } 
})()}

{(() => {
   if(bodyKit){
    return  <Box><FormControlLabel 
    disabled
    control={
    <Checkbox onChange={handleSetSoap}/>
    } label="Soap" /></Box>
 } else {
   return  <Box><FormControlLabel 
   control={
   <Checkbox checked={soap} onChange={handleSetSoap} />
   } label="Soap" /></Box>
 } 
})()}

{(() => {
   if(dentalKit){
    return  <Box><FormControlLabel 
    disabled
    control={
    <Checkbox  onChange={handleSetToothbrush}/>
    } label="Toothbrush/Toothpaste" /></Box>
 } else {
   return  <Box><FormControlLabel 
   control={
   <Checkbox checked={toothbrush} onChange={handleSetToothbrush} />
   } label="Toothbrush/Toothpaste" /></Box>
 } 
})()}

             
            </FormGroup>
            </FormControl>
            </Box>
            </Stack>
            </Grid>
            
            {(() => {
   if(gender === "Female"){
    return  <Stack spacing={2} direction="column">
    <Box>
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
<FormLabel component="legend">Feminine Hygiene</FormLabel>
<FormGroup>
    <FormControlLabel 
    control={
    <Checkbox checked={pads} onChange={handleSetPads} />
    } label="Pads" />
  <FormControlLabel 
    control={
    <Checkbox checked={tampons} onChange={handleSetTampons} />
    } label="Tampons" />
  </FormGroup>
  </FormControl>
  </Box>
  </Stack>
 } else {
   return  <></>
 } 
})()}
            
            </Box>
              </Stack>

              {(() => {
   if(nearestLocation.includes("Palm Beach")){
    return  <></>
 } else {
   return  <Stack spacing={2} direction="column">
   <Box>
   <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
<FormLabel component="legend">School Supplies</FormLabel>
<FormGroup>
<FormControlLabel 
control={
<Checkbox checked={backpack} onChange={handleSetBackpack} />
} label="Backpack" />
<FormControlLabel 
control={
<Checkbox checked={penandpaper} onChange={handleSetPen} />
} label="Pens / Pencils / Paper" />
<FormControlLabel 
control={
<Checkbox checked={composition} onChange={handleSetComposition} />
} label="Composition Notebooks" />
<FormControlLabel 
control={
<Checkbox checked={folder} onChange={handleSetFolder} />
} label="Folders / Binders" />
<FormControlLabel 
control={
<Checkbox checked={gluestick} onChange={handleSetGlue} />
} label="Gluestick / Art Materials" />
<FormControlLabel 
control={
<Checkbox checked={spiral} onChange={handleSetSpiral} />
} label="Spiral Notebooks" />
</FormGroup>
</FormControl>

     </Box>
     </Stack>
 } 
})()}

              
            </form>
        </div>
    )
}

export default BuildPackageItems;