import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
    root: {
        '&$focused $notchedOutline': {
            borderColor: 'black'
         },
         '&$focused $InputLabel': {
            borderColor: 'black'
         },
      },
      focused: {},
      notchedOutline: {},
})
      
      const uniformBottomChoices = [
        'Black',
        'Khaki',
        'Navy Blue'
      ];

      const uniformTopChoices = [
        'Baby Blue',
        'Black',
        'Forest Green',
        'Goldenrod Yellow',
        'Maroon',
        'Navy Blue',
        'Purple',
        'Red',
        'Royal Blue',
        'White'
      ];
      

      function getTopColors(uniformTopChoice, topColorName, theme) {
        return {
          fontWeight:
            topColorName.indexOf(uniformTopChoice) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

      function getBottomColors(uniformBottomChoice, bottomColorName, theme) {
        return {
          fontWeight:
            bottomColorName.indexOf(uniformBottomChoice) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
      

const BuildPackage = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [sizeErrorState, setSizeError] = React.useState(false);
    const [pantErrorState, setPantError] = React.useState(false);
    const [topErrorState, setTopError] = React.useState(false);
    const [outfitErrorState, setOutfitError] = React.useState(false);
    const [shoeErrorState, setShoeError] = React.useState(false);
    const [sockErrorState, setSockError] = React.useState(false);
    const [waistErrorState, setWaistError] = React.useState(false);
    const [bottomErrorState, setBottomError] = React.useState(false);
    const [topcolorErrorState, setTopcolorError] = React.useState(false);

    //const referralformerror is for validation alert
    const ReferralFormError = localStorage.getItem("ReferralFormError");
//store to localStorage until form is submitted
  



const [clothingInfoValues, setClothingInfoValues] = useState({})

    const [gender, setGender] = React.useState("");

    const [sizeType, setSizeType] = React.useState('');

    const handleSetSizeType = (event) => {
      setSizeType(event.target.value);
    };

    const [bra, setBra] = React.useState('');

    const handleSetBra = (event) => {
      setBra(event.target.value);
    };

    const [underwear, setUnderwear] = React.useState('');

    const handleSetUnderwear = (event) => {
      setUnderwear(event.target.value);
    };

    const [socks, setSocks] = React.useState('');

    const handleSetSocks = (event) => {
      setSocks(event.target.value);
    };

    const [outfitCombo, setOutfitCombo] = React.useState('');

    const handleSetOutfitCombo = (event) => {
      setOutfitCombo(event.target.value);
    };

    const [shoeSize, setShoeSize] = React.useState('');

    const handleSetShoeSize = (event) => {
      setShoeSize(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
        MenuProps:{
             disableScrollLock: true }
    };

      

      

      const [bottomColorName, setBottomColorName] = useState([]);

    const handleSetBottomColor = (event) => {
      const {
        target: { value },
      } = event;
          setBottomColorName(
        typeof value === 'string' ? value.split(',') : value,
          );
      };

     

      const [topColorName, setTopColorName] = useState([]);

    const handleSetTopColor = (event) => {
      const {
        target: { value },
      } = event;
          setTopColorName(
        typeof value === 'string' ? value.split(',') : value,
          );
      };

      

    const [pantSize, setPantSize] = React.useState('');

    const handleSetPantSize = (event) => {
      setPantSize(event.target.value);
    };

    const [pantWaist, setPantWaist] = React.useState('');

    const handleSetPantWaist = (event) => {
      setPantWaist(event.target.value);
    };

    const [topSize, setTopSize] = React.useState('');

    const handleSetTopSize = (event) => {
      setTopSize(event.target.value);
    };

    const clothingData = localStorage.getItem("ClothingInfo");
    const studentInfo = localStorage.getItem("StudentInfo");
    const savedClothingValues = JSON.parse(clothingData);
    const savedStudentValues = JSON.parse(studentInfo);
    const resumeClothingInfo = localStorage.getItem("resumeClothingInfo");
      useEffect (() => {
        const saveClothingValues = {sizeType, bra, underwear, socks, pantSize, pantWaist, topSize,
           shoeSize, outfitCombo, bottomColorName, topColorName}
        localStorage.setItem("ClothingInfo", JSON.stringify(saveClothingValues));
        localStorage.setItem("resumeClothingInfo", true);
        

        if (sizeType != "") {
          setSizeError(false);
        } 
        if (bottomColorName != "") {
          setBottomError(false);
        } else if (outfitCombo != "Three Casual Outfits" && bottomColorName.length === 0){
          setBottomError(true);
        }
        if (topColorName != "") {
          setTopcolorError(false);
        } else if (outfitCombo != "Three Casual Outfits" && topColorName.length === 0){
          setTopcolorError(true);
        }
        console.log(topColorName)
        console.log(topcolorErrorState)
        if (pantSize != "") {
          setPantError(false);
        } 
        if (topSize != "") {
          setTopError(false);
        } 
        if (socks !=""){
          setSockError(false);
        } 
        if(shoeSize !=""){
          setShoeError(false);
        } 
        if(outfitCombo != ""){
          setOutfitError(false);
        } if (sizeType != "Mens"){
          setWaistError(false);
        } 

      });

      useEffect(() => {
        setGender(savedStudentValues.gender);
         if(resumeClothingInfo === "true"){
      //setClothingInfoValues(savedClothingValues.clothingInfoValues);
      setSizeType(savedClothingValues.sizeType);
      setBra(savedClothingValues.bra);
      setUnderwear(savedClothingValues.underwear);
      setSocks(savedClothingValues.socks);
      setShoeSize(savedClothingValues.shoeSize);
      setOutfitCombo(savedClothingValues.outfitCombo);
      setPantSize(savedClothingValues.pantSize);
      setPantWaist(savedClothingValues.pantWaist);
      setTopSize(savedClothingValues.topSize);
      setBottomColorName(savedClothingValues.bottomColorName);
      setTopColorName(savedClothingValues.topColorName);
      
      if (sizeType === "") {
        setSizeError(true);
      }
      
      if (pantSize ===""){
        setPantError(true);
      } 
      if (topSize ===""){
        setTopError(true);
      } 
      if(outfitCombo ===""){
        setOutfitError(true);
      } 
      if(shoeSize === ""){
        setShoeError(true);
      } 
      if (socks === "") {
        setSockError(true);
      } 
      
      if (sizeType === "Mens" && pantWaist === ""){
        setWaistError(true);
      } 

      }

    }, {});

    

    return (
        <div>
            <Typography variant='h5' fontWeight={400} style={{padding: "50px", textAlign: "center"}}>
                Great! Now let's put together the clothing needed
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
            <Stack spacing={3} direction="column" sx={{ width: "35%"}}>
            <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="size-type-label">Size Type</InputLabel>
        <Select
          labelId="size-type-label"
          id="size-type"
          defaultValue=''
          value={sizeType}
          label="Size Type"
          fullWidth
          onChange={handleSetSizeType}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (sizeType === "") {
              setSizeError(true);
            } 
    }}
        >
          <MenuItem value='Toddler'>Toddler</MenuItem>
          <MenuItem value='Youth'>Youth</MenuItem>
          <MenuItem value='Juniors/Teens'>Juniors/Teens (Girls)</MenuItem>
          <MenuItem value='Womens'>Womens</MenuItem>
          <MenuItem value='Mens'>Mens</MenuItem>
        </Select>
      </FormControl>

      {(() => {
                if(sizeErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
      })()}
      </Stack>

      {(() => {
   if(gender === 'Female'){
    return  <TextField
    label="Bras( Types / Sizes )"
    variant="outlined"
    defaultValue=''
    value={bra}
    onChange={handleSetBra}
    style={{width: "40%", paddingBottom: "25px"}}
    />
 } else {
   return  <TextField
   label="Bras( Types / Sizes )"
   variant="outlined"
   disabled
   defaultValue=''
   value="Not Applicable"
   style={{width: "40%", paddingBottom: "25px"}}
   />
 } 
})()}
      </Stack>

                {(() => {
   if(sizeType === 'Toddler'){
    return  <Stack spacing={3}  direction="row">

<FormControl  sx={{ width: "22%", paddingBottom: "25px"}}>
        <InputLabel id="underwear-label">Underwear</InputLabel>
        <Select
          labelId="underwear-label"
          id="underwear"
          defaultValue=''
          value={underwear}
          label="Underwear"
          fullWidth
          onChange={handleSetUnderwear}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value='Yes'>Yes</MenuItem>
          <MenuItem value='No'>No</MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={3} direction="column" sx={{ width: "39%"}}>
    <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="pant-size">Pant Size</InputLabel>
<Select
labelId="pant-size"
id="pant-size"
label="Pant Size"
defaultValue=''
value={pantSize}
onChange={handleSetPantSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (pantSize === "") {
      setPantError(true);
    } 
  }}
>
<MenuItem value='2T'>2T</MenuItem>
<MenuItem value='3T'>3T</MenuItem>
<MenuItem value='4T'>4T</MenuItem>
</Select>
</FormControl>
{(() => {
                if(pantErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Pant Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
</Stack>

<Stack spacing={3} direction="column" sx={{ width: "39%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="top-size">Top Size</InputLabel>
<Select
labelId="top-size"
id="top-size"
label="Top Size"
defaultValue=''
value={topSize}
onChange={handleSetTopSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (topSize === "") {
      setTopError(true);
    } 
  }}
>
<MenuItem value='2T'>2T</MenuItem>
<MenuItem value='3T'>3T</MenuItem>
<MenuItem value='4T'>4T</MenuItem>
</Select>
</FormControl>

{(() => {
                if(topErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Invalid Entry</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
    </Stack>
    </Stack>
 } else if (sizeType === "Youth"){
   return  <Stack spacing={3}  direction="row">

   <Stack spacing={3} direction="column" sx={{ width: "50%"}}>
      <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
   <InputLabel id="pant-size">Pant Size</InputLabel>
   <Select
   labelId="pant-size"
   id="pantsize"
   label="Pant Size"
   defaultValue=''
   value={pantSize}
   onChange={handleSetPantSize}
   fullWidth
   MenuProps={{ disableScrollLock: true }}
   >
   <MenuItem value='2T'>4T - XS</MenuItem>
   <MenuItem value='3T'>5T - XS</MenuItem>
   <MenuItem value='4 - XS'>4 - XS</MenuItem>
   <MenuItem value='5 - XS'>5 - XS</MenuItem>
   <MenuItem value='6 - S'>6 - S</MenuItem>
   <MenuItem value='6X - S'>6X - S</MenuItem>
   <MenuItem value='7 - S'>7 - S</MenuItem>
   <MenuItem value='8 - M'>8 - M</MenuItem>
   <MenuItem value='XS (4-5)'>XS (4-5)</MenuItem>
   <MenuItem value='S (6-8)'>S (6-8)</MenuItem>
   <MenuItem value='M (10-12)'>M (10-12)</MenuItem>
   <MenuItem value='L (14-16)'>L (14-16)</MenuItem>
   <MenuItem value='XL (18-20)'>XL (18-20)</MenuItem>
   </Select>
   </FormControl>
   {(() => {
                   if(pantErrorState){
                     return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Pant Size Required</FormHelperText>
                   } else {
                     return  <></>
                   } 
                 })()}
   </Stack>
   
   <Stack spacing={3} direction="column" sx={{ width: "50%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="top-size">Top Size</InputLabel>
<Select
labelId="top-size"
id="topsize"
label="Top Size"
defaultValue=''
value={topSize}
onChange={handleSetTopSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (topSize === "") {
      setTopError(true);
    } 
  }}
>
<MenuItem value='4T - XS'>4T - XS</MenuItem>
<MenuItem value='5T - XS'>5T - XS</MenuItem>
<MenuItem value='4 - XS'>4 - XS</MenuItem>
<MenuItem value='5 - XS'>5 - XS</MenuItem>
<MenuItem value='6 - S'>6 - S</MenuItem>
<MenuItem value='6X - S'>6X - S</MenuItem>
<MenuItem value='7 - S'>7 - S</MenuItem>
<MenuItem value='8 - M'>8 - M</MenuItem>
<MenuItem value='XS (4-5)'>XS (4-5)</MenuItem>
<MenuItem value='S (6-8)'>S (6-8)</MenuItem>
<MenuItem value='M (10-12)'>M (10-12)</MenuItem>
<MenuItem value='L (14-16)'>L (14-16)</MenuItem>
<MenuItem value='XL (18-20)'>XL (18-20)</MenuItem>
</Select>
</FormControl>
{(() => {
                if(topErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Top Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
   </Stack>
   </Stack>
 } else if (sizeType === "Juniors/Teens"){
   return <Stack spacing={3}  direction="row">

   <Stack spacing={3} direction="column" sx={{ width: "50%"}}>   
      <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
   <InputLabel id="pant-size">Pant Size</InputLabel>
   <Select
   labelId="pant-size"
   id="pantsize"
   label="Pant Size"
   defaultValue=''
   value={pantSize}
   onChange={handleSetPantSize}
   fullWidth
   MenuProps={{ disableScrollLock: true }}
   onClick= {() => {
       if (pantSize === "") {
         setPantError(true);
       } 
     }}
   >
   <MenuItem value='0-1 XS'>0-1 XS</MenuItem>
   <MenuItem value='3-5 S'>3-5 S</MenuItem>
   <MenuItem value='7-9 M'>7-9 M</MenuItem>
   <MenuItem value='11-13 L'>11-13 L</MenuItem>
   </Select>
   </FormControl>
   {(() => {
                   if(pantErrorState){
                     return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Pant Size Required</FormHelperText>
                   } else {
                     return  <></>
                   } 
                 })()}
   </Stack>
   
   <Stack spacing={3} direction="column" sx={{ width: "50%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="top-size">Top Size</InputLabel>
<Select
labelId="top-size"
id="topsize"
label="Top Size"
defaultValue=''
value={topSize}
onChange={handleSetTopSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (topSize === "") {
      setTopError(true);
    } 
  }}
>
<MenuItem value='0-1 XS'>0-1 XS</MenuItem>
<MenuItem value='3-5 S'>3-5 S</MenuItem>
<MenuItem value='7-9 M'>7-9 M</MenuItem>
<MenuItem value='11-13 L'>11-13 L</MenuItem>
</Select>
</FormControl>
{(() => {
                if(topErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Top Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
   </Stack>
   </Stack>
 } else if (sizeType === "Womens") {
return <Stack spacing={3} direction="row" >

<Stack spacing={3} direction="column" sx={{ width: "50%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="womens-pants">Pant Size</InputLabel>
<Select
labelId="womens-pants"
id="womens-pants"
label="Pant Size"
defaultValue=''
value={pantSize}
onChange={handleSetPantSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (pantSize === "") {
      setPantError(true);
    } 
  }}
>
<MenuItem value='0'>0</MenuItem>
<MenuItem value='2'>2</MenuItem>
<MenuItem value='4'>4</MenuItem>
<MenuItem value='6'>6</MenuItem>
<MenuItem value='8'>8</MenuItem>
<MenuItem value='10'>10</MenuItem>
<MenuItem value='12'>12</MenuItem>
<MenuItem value='14'>14</MenuItem>
<MenuItem value='16'>16</MenuItem>
<MenuItem value='18'>18</MenuItem>
<MenuItem value='20'>20</MenuItem>
<MenuItem value='22'>22</MenuItem>
<MenuItem value='24'>24</MenuItem>
</Select>
</FormControl>
{(() => {
                if(pantErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Pant Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
</Stack>

<Stack spacing={3} direction="column" sx={{ width: "50%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="top-size">Top Size</InputLabel>
<Select
labelId="top-size"
id="top-size"
label="Top Size"
defaultValue=''
value={topSize}
onChange={handleSetTopSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (topSize === "") {
      setTopError(true);
    } 
  }}
>
<MenuItem value='4-5 XS'>4-5 XS</MenuItem>
<MenuItem value='6-8 S'>6-8 S</MenuItem>
<MenuItem value='10-12 M'>10-12 M</MenuItem>
<MenuItem value='14-16 L'>14-16 L</MenuItem>
<MenuItem value='18-20 XL'>18-20 XL</MenuItem>
<MenuItem value='22-24 2XL'>22-24 2XL</MenuItem>
<MenuItem value='26-28 3XL'>26-28 3XL</MenuItem>
</Select>
</FormControl>
{(() => {
                if(topErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Top Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
</Stack>
</Stack>
 } else if (sizeType === "Mens") {
   return <Stack spacing={3} direction="row" >
   <FormControl  sx={{ width: "33%", paddingBottom: "25px"}}>
<InputLabel id="mens-waist">Pant Waist</InputLabel>
<Select
labelId="mens-waist"
id="waist"
label="Pant Waist"
defaultValue=''
value={pantWaist}
onChange={handleSetPantWaist}
fullWidth
MenuProps={{ disableScrollLock: true }}
>
<MenuItem value='28'>28</MenuItem>
<MenuItem value='29'>29</MenuItem>
<MenuItem value='30'>30</MenuItem>
<MenuItem value='31'>31</MenuItem>
<MenuItem value='32'>32</MenuItem>
<MenuItem value='33'>33</MenuItem>
<MenuItem value='34'>34</MenuItem>
<MenuItem value='35'>35</MenuItem>
<MenuItem value='36'>36</MenuItem>
<MenuItem value='37'>37</MenuItem>
<MenuItem value='38'>38</MenuItem>
<MenuItem value='39'>39</MenuItem>
<MenuItem value='40'>40</MenuItem>
<MenuItem value='41'>41</MenuItem>
<MenuItem value='42'>42</MenuItem>
<MenuItem value='43'>43</MenuItem>
<MenuItem value='44'>44</MenuItem>
<MenuItem value='45'>45</MenuItem>
<MenuItem value='46'>46</MenuItem>
<MenuItem value='47'>47</MenuItem>
<MenuItem value='48'>48</MenuItem>
<MenuItem value='49'>49</MenuItem>
<MenuItem value='50'>50</MenuItem>
</Select>
</FormControl>

<Stack spacing={3} direction="column" sx={{ width: "33%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="mens-length">Pant Length</InputLabel>
<Select
labelId="mens-length"
id="length"
label="Pant Length"
defaultValue=''
value={pantSize}
onChange={handleSetPantSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (pantSize === "") {
      setPantError(true);
    } 
  }}
>
<MenuItem value='28'>28</MenuItem>
<MenuItem value='29'>29</MenuItem>
<MenuItem value='30'>30</MenuItem>
<MenuItem value='31'>31</MenuItem>
<MenuItem value='32'>32</MenuItem>
<MenuItem value='33'>33</MenuItem>
<MenuItem value='34'>34</MenuItem>
<MenuItem value='35'>35</MenuItem>
<MenuItem value='36'>36</MenuItem>
<MenuItem value='37'>37</MenuItem>
<MenuItem value='38'>38</MenuItem>
<MenuItem value='39'>39</MenuItem>
<MenuItem value='40'>40</MenuItem>
<MenuItem value='41'>41</MenuItem>
<MenuItem value='42'>42</MenuItem>
<MenuItem value='43'>43</MenuItem>
<MenuItem value='44'>44</MenuItem>
<MenuItem value='45'>45</MenuItem>
<MenuItem value='46'>46</MenuItem>
<MenuItem value='47'>47</MenuItem>
<MenuItem value='48'>48</MenuItem>
<MenuItem value='49'>49</MenuItem>
<MenuItem value='50'>50</MenuItem>
</Select>
</FormControl>
{(() => {
                if(pantErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Pant Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
</Stack>

<Stack spacing={3} direction="column" sx={{ width: "33%"}}>
<FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="top-size">Top Size</InputLabel>
<Select
labelId="top-size"
id="topsize"
label="Top Size"
defaultValue=''
value={topSize}
onChange={handleSetTopSize}
fullWidth
MenuProps={{ disableScrollLock: true }}
onClick= {() => {
    if (topSize === "") {
      setTopError(true);
    } 
  }}
>
<MenuItem value='S (14-14.5)'>S (14-14.5)</MenuItem>
<MenuItem value='M (15-15.5)'>M (15-15.5)</MenuItem>
<MenuItem value='L (16-16.5)'>L (16-16.5)</MenuItem>
<MenuItem value='XL (17-17.5)'>XL (17-17.5)</MenuItem>
<MenuItem value='2XL (18-18.5)'>2XL (18-18.5)</MenuItem>
<MenuItem value='3XL (19-19.5)'>3XL (19-19.5)</MenuItem>
</Select>
</FormControl>
{(() => {
                if(topErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Top Size Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
   </Stack>
   </Stack>
 }
})()}
                
                <Stack spacing={3} direction="row" >
                <Stack spacing={3} direction="column" sx={{width: "20%"}}>
                <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="socks-label">Socks</InputLabel>
        <Select
          labelId="socks-label"
          id="socks"
          defaultValue=''
          value={socks}
          label="Socks"
          fullWidth
          onChange={handleSetSocks}
          onClick= {() => {
            if (socks === "") {
              setSockError(true);
            } 
          }}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value='Yes'>Yes</MenuItem>
          <MenuItem value='No'>No</MenuItem>
        </Select>
      </FormControl>

      {(() => {
                if(sockErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
              })()}
</Stack>


      {(() => {
   if(sizeType === 'Toddler'){
    return  <>
     <Stack spacing={3} direction="column" sx={{width: "30%"}}>
    <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
<InputLabel id="shoe-size">Shoe Size</InputLabel>
<Select
labelId="shoe-size"
id="shoe-size"
label="Shoe Size"
defaultValue=''
value={shoeSize}
onChange={handleSetShoeSize}
onClick= {() => {
  if (shoeSize === "") {
    setShoeError(true);
  } 
}}
fullWidth
MenuProps={{ disableScrollLock: true }}
>
<MenuItem value='Toddler 05'>Toddler 05</MenuItem>
<MenuItem value='Toddler 06'>Toddler 06</MenuItem>
<MenuItem value='Toddler 07'>Toddler 07</MenuItem>
<MenuItem value='Toddler 08'>Toddler 08</MenuItem>
<MenuItem value='Toddler 09'>Toddler 09</MenuItem>
<MenuItem value='Toddler 10'>Toddler 10</MenuItem>
<MenuItem value='Children 1'>Children 1</MenuItem>
<MenuItem value='Children 1.5'>Children 1.5</MenuItem>
<MenuItem value='Children 2'>Children 2</MenuItem>
<MenuItem value='Children 2.5'>Children 2.5</MenuItem>
<MenuItem value='Children 3'>Children 3</MenuItem>
<MenuItem value='Children 3.5'>Children 3.5</MenuItem>
<MenuItem value='Children 4'>Children 4</MenuItem>
<MenuItem value='Children 4.5'>Children 4.5</MenuItem>
<MenuItem value='Children 5'>Children 5</MenuItem>
<MenuItem value='Children 5.5'>Children 5.5</MenuItem>
<MenuItem value='Children 6'>Children 6</MenuItem>
<MenuItem value='Children 10'>Children 10</MenuItem>
</Select>
</FormControl>
{(() => {
                if(shoeErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
</>

 } else if (sizeType === "Youth"){
   return  <>
    <Stack spacing={3} direction="column" sx={{width: "30%"}}>
   <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
   <InputLabel id="shoe-size">Shoe Size</InputLabel>
   <Select
   labelId="shoe-size"
   id="shoe-size"
   label="Shoe Size"
   defaultValue=''
   value={shoeSize}
   onChange={handleSetShoeSize}
   onClick= {() => {
    if (shoeSize === "") {
      setShoeError(true);
    } 
}}
   fullWidth
   MenuProps={{ disableScrollLock: true }}
   >
   <MenuItem value='Children 1'>Children 1</MenuItem>
   <MenuItem value='Children 1.5'>Children 1.5</MenuItem>
   <MenuItem value='Children 2'>Children 2</MenuItem>
   <MenuItem value='Children 2.5'>Children 2.5</MenuItem>
   <MenuItem value='Children 3'>Children 3</MenuItem>
   <MenuItem value='Children 3.5'>Children 3.5</MenuItem>
   <MenuItem value='Children 4'>Children 4</MenuItem>
   <MenuItem value='Children 4.5'>Children 4.5</MenuItem>
   <MenuItem value='Children 5'>Children 5</MenuItem>
   <MenuItem value='Children 5.5'>Children 5.5</MenuItem>
   <MenuItem value='Children 6'>Children 6</MenuItem>
   <MenuItem value='Children 10'>Children 10</MenuItem>
   <MenuItem value='Children 11'>Children 11</MenuItem>
   <MenuItem value='Children 12'>Children 12</MenuItem>
   <MenuItem value='Children 13'>Children 13</MenuItem>
   <MenuItem value='Mens 7'>Mens 7</MenuItem>
   <MenuItem value='Mens 7.5'>Mens 7.5</MenuItem>
   <MenuItem value='Mens 8'>Mens 8</MenuItem>
   <MenuItem value='Mens 8.5'>Mens 8.5</MenuItem>
   <MenuItem value='Mens 9'>Mens 9</MenuItem>
   <MenuItem value='Womens 6'>Womens 6</MenuItem>
   <MenuItem value='Womens 6.5'>Womens 6.5</MenuItem>
   <MenuItem value='Womens 7'>Womens 7</MenuItem>
   <MenuItem value='Womens 7.5'>Womens 7.5</MenuItem>
   <MenuItem value='Womens 8'>Womens 8</MenuItem>
   </Select>
   </FormControl>
   {(() => {
                if(shoeErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
   </Stack></>

 } else {
   return <>
   <Stack spacing={3} direction="column" sx={{width: "30%"}}>
   <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
   <InputLabel id="shoe-size">Shoe Size</InputLabel>
   <Select
   labelId="shoe-size"
   id="shoe-size"
   label="Shoe Size"
   defaultValue=''
   value={shoeSize}
   onChange={handleSetShoeSize}
   fullWidth
   MenuProps={{ disableScrollLock: true }}
   onClick= {() => {
    if (shoeSize === "") {
      setShoeError(true);
    } 
}}
   >
   <MenuItem value='Children 1'>Children 1</MenuItem>
   <MenuItem value='Children 1.5'>Children 1.5</MenuItem>
   <MenuItem value='Children 2'>Children 2</MenuItem>
   <MenuItem value='Children 2.5'>Children 2.5</MenuItem>
   <MenuItem value='Children 3'>Children 3</MenuItem>
   <MenuItem value='Children 3.5'>Children 3.5</MenuItem>
   <MenuItem value='Children 4'>Children 4</MenuItem>
   <MenuItem value='Children 4.5'>Children 4.5</MenuItem>
   <MenuItem value='Children 5'>Children 5</MenuItem>
   <MenuItem value='Children 5.5'>Children 5.5</MenuItem>
   <MenuItem value='Children 6'>Children 6</MenuItem>
   <MenuItem value='Children 10'>Children 10</MenuItem>
   <MenuItem value='Children 11'>Children 11</MenuItem>
   <MenuItem value='Children 12'>Children 12</MenuItem>
   <MenuItem value='Children 13'>Children 13</MenuItem>
   <MenuItem value='Mens 7'>Mens 7</MenuItem>
   <MenuItem value='Mens 7.5'>Mens 7.5</MenuItem>
   <MenuItem value='Mens 8'>Mens 8</MenuItem>
   <MenuItem value='Mens 8.5'>Mens 8.5</MenuItem>
   <MenuItem value='Mens 9'>Mens 9</MenuItem>
   <MenuItem value='Mens 9.5'>Mens 9.5</MenuItem>
   <MenuItem value='Mens 10'>Mens 10</MenuItem>
   <MenuItem value='Mens 10.5'>Mens 10.5</MenuItem>
   <MenuItem value='Mens 11'>Mens 11</MenuItem>
   <MenuItem value='Mens 11.5'>Mens 11.5</MenuItem>
   <MenuItem value='Mens 12'>Mens 12</MenuItem>
   <MenuItem value='Mens 12.5'>Mens 12.5</MenuItem>
   <MenuItem value='Mens 13'>Mens 13</MenuItem>
   <MenuItem value='Mens 13.5'>Mens 13.5</MenuItem>
   <MenuItem value='Mens 14'>Mens 14</MenuItem>
   <MenuItem value='Womens 6'>Womens 6</MenuItem>
   <MenuItem value='Womens 6.5'>Womens 6.5</MenuItem>
   <MenuItem value='Womens 7'>Womens 7</MenuItem>
   <MenuItem value='Womens 7.5'>Womens 7.5</MenuItem>
   <MenuItem value='Womens 8'>Womens 8</MenuItem>
   <MenuItem value='Womens 8.5'>Womens 8.5</MenuItem>
   <MenuItem value='Womens 9'>Womens 9</MenuItem>
   <MenuItem value='Womens 9.5'>Womens 9.5</MenuItem>
   <MenuItem value='Womens 10'>Womens 10</MenuItem>
   <MenuItem value='Womens 10.5'>Womens 10.5</MenuItem>
   <MenuItem value='Womens 11'>Womens 11</MenuItem>
   </Select>
   </FormControl>
   {(() => {
                if(shoeErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
   </Stack></>

 } 
})()}

<Stack spacing={3} direction="column" sx={{ width: "50%"}}>
      <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="outfit-label">Outfit Combination</InputLabel>
        <Select
          labelId="outfit-label"
          id="outfit"
          defaultValue=''
          value={outfitCombo}
          label="Outfit Combination"
          fullWidth
          onChange={handleSetOutfitCombo}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (outfitCombo === "") {
              setOutfitError(true);
            } 
        }}
        >
          <MenuItem value='One Uniform, Two Casual Outfits'>One Uniform, Two Casual Outfits</MenuItem>
          <MenuItem value='Two Uniforms, One Casual Outfit'>Two Uniforms, One Casual Outfit</MenuItem>
          <MenuItem value='Three Casual Outfits'>Three Casual Outfits</MenuItem>
          <MenuItem value='Three Uniforms'>Three Uniforms</MenuItem>
        </Select>
      </FormControl>

      {(() => {
                if(outfitErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                </Stack>

                <Stack spacing={3} direction="row" >
                

                {(() => {
//    if(outfitCombo === 'Three Casual Outfits'){

//     setBottomColorName([]);
//     setTopColorName([]);

//  } 
 if(outfitCombo === 'One Uniform, Two Casual Outfits'){

  return <><FormControl sx={{width: "50%", paddingBottom: "25px"}}>
   <InputLabel id="bottom-color-label">Uniform Bottom Color(s)</InputLabel>
   <Select
     labelId="bottom-color-label"
     id="bottom-color"
     maximumSelectionLimit={1}
     multiple
     defaultValue=''
     value={bottomColorName}
     onChange={handleSetBottomColor}
     input={<OutlinedInput id="bottom-color-preference" label="Uniform Bottom Color(s)" />}
     renderValue={(selected) => (
       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
         {selected.map((value) => (
           <Chip key={value} label={value} />
         ))}
       </Box>
     )}
     MenuProps={MenuProps}
   >
     {uniformBottomChoices.map((uniformBottomChoice) => (
       <MenuItem
         key={uniformBottomChoice}
         value={uniformBottomChoice}
         style={getBottomColors(uniformBottomChoice, bottomColorName, theme)}
       >
         {uniformBottomChoice}
       </MenuItem>
     ))}
   </Select>
   {(() => {
                if(bottomErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
 </FormControl>
 <FormControl sx={{width: "50%", paddingBottom: "25px"}}>
 <InputLabel id="top-color-label">Uniform Top Color(s)</InputLabel>
 <Select
   labelId="top-color-label"
   id="top-color"
   multiple
   maximumSelectionLength={1}
   defaultValue=''
   value={topColorName}
   onChange={handleSetTopColor}
   input={<OutlinedInput id="top-color-preference" label="Uniform Top Color(s)" />}
   renderValue={(selected) => (
     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
       {selected.map((value) => (
         <Chip key={value} label={value} />
       ))}
     </Box>
   )}
   MenuProps={MenuProps}
 >
   {uniformTopChoices.map((uniformTopChoice) => (
     <MenuItem
       key={uniformTopChoice}
       value={uniformTopChoice}
       style={getTopColors(uniformTopChoice, topColorName, theme)}
     >
       {uniformTopChoice}
     </MenuItem>
   ))}
 </Select>
 {(() => {
                if(topcolorErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
</FormControl>

</>

}if(outfitCombo === 'Two Uniforms, One Casual Outfit'){

  return <><FormControl sx={{width: "50%", paddingBottom: "25px"}}>
  <InputLabel id="bottom-color-label">Uniform Bottom Color(s)</InputLabel>
  <Select
    labelId="bottom-color-label"
    id="bottom-color"
    multiple
    maximumSelectionLength={2}
    defaultValue=''
    value={bottomColorName}
    onChange={handleSetBottomColor}
    input={<OutlinedInput id="bottom-color-preference" label="Uniform Bottom Color(s)" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    )}
    MenuProps={MenuProps}
  >
    {uniformBottomChoices.map((uniformBottomChoice) => (
      <MenuItem
        key={uniformBottomChoice}
        value={uniformBottomChoice}
        style={getBottomColors(uniformBottomChoice, bottomColorName, theme)}
      >
        {uniformBottomChoice}
      </MenuItem>
    ))}
  </Select>
  {(() => {
                if(bottomErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
</FormControl>
<FormControl sx={{width: "50%", paddingBottom: "25px"}}>
<InputLabel id="top-color-label">Uniform Top Color(s)</InputLabel>
<Select
  labelId="top-color-label"
  id="top-color"
  maximumSelectionLength={2}
  multiple
  defaultValue=''
  value={topColorName}
  onChange={handleSetTopColor}
  input={<OutlinedInput id="top-color-preference" label="Uniform Top Color(s)" />}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  MenuProps={MenuProps}
>
  {uniformTopChoices.map((uniformTopChoice) => (
    <MenuItem
      key={uniformTopChoice}
      value={uniformTopChoice}
      style={getTopColors(uniformTopChoice, topColorName, theme)}
    >
      {uniformTopChoice}
    </MenuItem>
  ))}
</Select>
{(() => {
                if(topcolorErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
</FormControl>
</>

}if(outfitCombo === 'Three Uniforms'){

  return <><FormControl sx={{width: "50%", paddingBottom: "25px"}}>
  <InputLabel id="bottom-color-label">Uniform Bottom Color(s)</InputLabel>
  <Select
    labelId="bottom-color-label"
    id="bottom-color"
    multiple
    maximumSelectionLength={3}
    defaultValue=''
    value={bottomColorName}
    onChange={handleSetBottomColor}
    input={<OutlinedInput id="bottom-color-preference" label="Uniform Bottom Color(s)" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    )}
    MenuProps={MenuProps}
  >
    {uniformBottomChoices.map((uniformBottomChoice) => (
      <MenuItem
        key={uniformBottomChoice}
        value={uniformBottomChoice}
        style={getBottomColors(uniformBottomChoice, bottomColorName, theme)}
      >
        {uniformBottomChoice}
      </MenuItem>
    ))}
  </Select>
  {(() => {
                if(bottomErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
</FormControl>
<FormControl sx={{width: "50%", paddingBottom: "25px"}}>
<InputLabel id="top-color-label">Uniform Top Color(s)</InputLabel>
<Select
  labelId="top-color-label"
  id="top-color"
  multiple
  maximumSelectionLength={3}
  defaultValue=''
  value={topColorName}
  onChange={handleSetTopColor}
  input={<OutlinedInput id="top-color-preference" label="Uniform Top Color(s)" />}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  MenuProps={MenuProps}
>
  {uniformTopChoices.map((uniformTopChoice) => (
    <MenuItem
      key={uniformTopChoice}
      value={uniformTopChoice}
      style={getTopColors(uniformTopChoice, topColorName, theme)}
    >
      {uniformTopChoice}
    </MenuItem>
  ))}
</Select>
{(() => {
                if(topcolorErrorState){
                  return  <FormHelperText style={{color: "red", paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
</FormControl>

</>

}
})()}
                
                </Stack>
            </form>
        </div>
    )
}

export default BuildPackage;