import React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";

      

const Confirm = ({handleNext, handlePrevious}) => {


//store to localStorage until form is submitted
  


useEffect(() => {
  const supplyData = window.localStorage.getItem("SupplyInfo")
  const clothingInfo = window.localStorage.getItem("ClothingInfo")
  const studentInfo = window.localStorage.getItem("StudentInfo")
  const referrerData = window.localStorage.getItem("ReferrerInfo")
  const savedReferrerValues = JSON.parse(referrerData);
  const savedClothingValues = JSON.parse(clothingInfo);
  const savedSupplyValues = JSON.parse(supplyData);
  const savedStudentValues = JSON.parse(studentInfo);
  setReferrerFirst(savedReferrerValues.referrer_fname);
  setReferrerLast(savedReferrerValues.referrer_lname);
  setReferrerEmail(savedReferrerValues.referrer_email);
  setReferrerPhone(savedReferrerValues.referrer_phone);
  setPhoneProvider(savedReferrerValues.phoneProvider);
  setReferrerAgency(savedReferrerValues.referrer_agency);
  setReferrerAgencyZip(savedReferrerValues.referrer_agencyzip);
  setNearestLocation(savedReferrerValues.nearestLocation);
  setNotificationPreference(savedReferrerValues.notificationPreference);
  setStudentInitials(savedStudentValues.formStudentInitials);
  setGender(savedStudentValues.gender);
  setEthnicity(savedStudentValues.ethnicity);
  setRelation(savedStudentValues.relation);
  setGrade(savedStudentValues.grade);
  setHRTeacher(savedStudentValues.HRTeacher);
  setStudentAgency(savedStudentValues.studentAgency);
  setStudentZip(savedStudentValues.studentZip);
  setLivingStatus(savedStudentValues.livingStatus);
  setLivingSituation(savedStudentValues.livingSituation);
  setStudentBackground(savedStudentValues.studentBackground);
  setStyleName(savedStudentValues.styleName);
  setStyleManual(savedStudentValues.styleManual);
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
  setGender(savedStudentValues.gender);
}, []);

//get error variable from localstorage and condition to lock/unlock submit button
const ReferralFormError = localStorage.getItem("ReferralFormError");

if(ReferralFormError === "true"){
  var disabled = true;
} else {
   var disabled = false;
}

//submit functions
function handleSubmit() {
    const referral = {referrer_fname: referrer_fname, referrer_lname: referrer_lname, referrer_fullname: referrer_fullname, referrer_email: referrer_email,
    referrer_phone: referrer_phone, referrer_provider: phoneProvider, referrer_agency: referrer_agency, referrer_agencyzip: referrer_agencyzip,
referrer_notification: notificationPreference, referrer_nearest_loc: nearestLocation, student_initials: formStudentInitials, 
student_agency: studentAgency, student_agency_zip: studentZip, relation: relation, hr_teacher: HRTeacher, grade_level: grade, gender: gender,
ethnicity: ethnicity, living_status: livingStatus, living_status_note: livingSituation, background: studentBackground, style_pref: style_pref,
size_type: sizeType, pant_size: pantSize, pant_waist: pantWaist, top_size: topSize, outfit_combo: outfitCombo, bottom_color: uniform_bottoms,
top_colors: uniform_tops, bra_info: bra, underwear: underwear, shoe_size: shoeSize, socks: socks, hygiene_kit: hygiene_kit, hygiene_items: hygiene_items,
feminine_hygiene: feminine_hygiene, school_supplies: school_supplies, status: "UNASSIGNED", referrer: referrer_user}
    axios.post(`http://localhost:3001/referrals/`, referral
    ).then(async (response) => {
        if(response.status = 200){

            localStorage.removeItem("SupplyInfo")
            localStorage.removeItem("ClothingInfo")
            localStorage.removeItem("StudentInfo")
            localStorage.removeItem("ReferrerInfo")
            localStorage.removeItem("referralStart");
            localStorage.setItem("resumeStudentInfo", false);
            localStorage.setItem("resumeClothingInfo", false);
            localStorage.setItem("resumeSupplyInfo", false);
            localStorage.setItem("resumeReferrerInfo", false);

        } else {
            alert(response.data.error);
        }
    })
}

    
    

async function handleConfirmationEmail() {
      
        try {
          await axios.post("http://localhost:3001/confirmation-email", {
            email: emailAddress,
            subject: "We've got it! Your Referral is in Our System",
            text: text,
            firstname: referrer_fname,
            student_initials: formStudentInitials,
            pickuplocation: nearestLocation
          })
        } catch (error) {
          console.log(error)
        }
      }
      
      async function handleConfirmationText() {
      
        try {
          await axios.post("http://localhost:3001/confirmation-text", {
            email: phoneAddress,
            subject: "Referral Received, " + referrer_fname + "!",
            text: "Your Referral for" + formStudentInitials + " with The Giving Closet Project has been accepted and will process soon. " 
            + "You can view the referral's progress on your account. Your nearest pickup location is:  " + nearestLocation,
            firstname: referrer_fname,
            student_initials: formStudentInitials,
            pickuplocation: nearestLocation
          })
        } catch (error) {
          console.log(error)
        }
      }

    //Referrer Info
    const referrer_user = localStorage.getItem("username");
    const Fname = localStorage.getItem("Firstname");
    const Lname = localStorage.getItem("Lastname");
    const EmailAdd = localStorage.getItem("Email");
    const PhoneNum = localStorage.getItem("Phonenumber");
    const PhoneProv = localStorage.getItem("PhoneProvider");
    const refAgency = localStorage.getItem("Agency");
    const refAgencyZip = localStorage.getItem("Agency_zipcode");
    const refNearest = localStorage.getItem("nearest_location");
    const Notification = localStorage.getItem("Notification");
    const [phoneProvider, setPhoneProvider] = useState('');
    const [referrer_fname, setReferrerFirst] = useState('');
    const [referrer_lname, setReferrerLast] = useState('');
    const [referrer_email, setReferrerEmail] = useState('');
    const [referrer_phone, setReferrerPhone] = useState('');
    const [referrer_agency, setReferrerAgency] = useState('');
    const [referrer_agencyzip, setReferrerAgencyZip] = useState('');
    const [nearestLocation, setNearestLocation] = useState('');
    const [notificationPreference, setNotificationPreference] = useState('');

    const [text, setText] = useState('');
    const emailAddress = referrer_email;
    const phoneAddress = referrer_phone + phoneProvider;


    if(referrer_fname === ""){
        setReferrerFirst(Fname);
    }
    if(referrer_lname === ""){
        setReferrerLast(Lname);
    }
    if(referrer_email === ""){
        setReferrerEmail(EmailAdd)
    }
    if(referrer_phone === ""){
        setReferrerPhone(PhoneNum);
    }
    if(phoneProvider === ""){
        setPhoneProvider(PhoneProv);
    }
    if (referrer_agency === "") {
        setReferrerAgency(refAgency)
    }
    if(referrer_agencyzip === ""){
        setReferrerAgencyZip(refAgencyZip)
    }
    if(nearestLocation === ""){
        setNearestLocation(refNearest)       
    } 
    if(notificationPreference === ""){
        setNotificationPreference(Notification);
    }
    const referrer_fullname = referrer_fname + " " + referrer_lname;

    //student info
    const [formStudentInitials, setStudentInitials] = useState();
    const [gender, setGender] = React.useState("");
    const [ethnicity, setEthnicity] = useState('');
    const [relation, setRelation] = useState('');
    const [grade, setGrade] = useState('');
    const [HRTeacher, setHRTeacher] = useState("");
    const [studentAgency, setStudentAgency] = useState("");
    const [studentZip, setStudentZip] = useState("");
    const [livingStatus, setLivingStatus] = useState('');
    const [livingSituation, setLivingSituation] = useState('');
    const [studentBackground, setStudentBackground] = useState('');
    const [styleName, setStyleName] = useState([]);
    const [styleManual, setStyleManual] = useState("");
    const style_pref = styleName.toString() + "," + styleManual;

    //clothing
    const [sizeType, setSizeType] = React.useState('');
    const [pantSize, setPantSize] = React.useState('');
    const [pantWaist, setPantWaist] = React.useState('');
    const [topSize, setTopSize] = React.useState('');
    const [bra, setBra] = React.useState('');
    const [underwear, setUnderwear] = React.useState('');
    const [socks, setSocks] = React.useState('');
    const [outfitCombo, setOutfitCombo] = React.useState('');
    const [shoeSize, setShoeSize] = React.useState();
    const [bottomColorName, setBottomColorName] = useState([]);
    const [topColorName, setTopColorName] = useState([]);
    var uniform_bottoms = bottomColorName.toString();
    var uniform_tops = topColorName.toString();

    if(bra === ""){
      setBra("N/A")
    }
    if(underwear === ""){
      setUnderwear("N/A")
    }
    if(socks === ""){
      setSocks("N/A")
    }
    if(uniform_bottoms === ""){
uniform_bottoms = "N/A"
    }
    if(uniform_tops === ""){
      uniform_tops = "N/A"
    }

    //supplies
    const [bodyKit, setBodyKit] = React.useState(false);
    const [dentalKit, setDentalKit] = React.useState(false);
    const [lotion, setLotion] = React.useState(false);
    const [deodorant, setDeodorant] = React.useState(false);
    const [floss, setFloss] = React.useState(false);
    const [shampoo, setShampoo] = React.useState(false);
    const [soap, setSoap] = React.useState(false);
    const [toothbrush, setToothbrush] = React.useState(false);
    const [pads, setPads] = React.useState(false);
    const [tampons, setTampons] = React.useState(false);
    const [spiral, setSpiral] = React.useState(false);
    const [backpack, setBackpack] = React.useState(false);
    const [penandpaper, setPen] = React.useState(false);
    const [composition, setComposition] = React.useState(false);
    const [folder, setFolder] = React.useState(false);
    const [gluestick, setGlue] = React.useState(false);

    //agreements
    const [inNeed, setInNeed] = React.useState(false);
    const [outreach, setOutreach] = React.useState(false);

    const handleSetInNeed  = (event) => {
      setInNeed(event.target.checked);
    };

    const handleSetOutreach  = (event) => {
      setOutreach(event.target.checked);
    };

    
    const hygieneKitArray = [];

console.log(hygieneKitArray);

    if(bodyKit){
        hygieneKitArray.push('Body Kit');
    }

    if(dentalKit) {
        hygieneKitArray.push('Dental Kit');
    } 

    const hygiene_kit = hygieneKitArray.toString();

    const hygieneItemsArray = [];
    const dentalHygieneItemsArray = [];
    const feminineHygieneArray = [];
    const schoolItemsArray = [];

if (lotion){
hygieneItemsArray.push('Lotion');
}

if(deodorant){
  hygieneItemsArray.push('Deodorant');
}

if(floss){
  dentalHygieneItemsArray.push('Floss');
}

if(shampoo){
  hygieneItemsArray.push('Shampoo');
}

if(soap){
  hygieneItemsArray.push('Soap');
}

if(toothbrush){
  dentalHygieneItemsArray.push('Toothbrush');
}

if(pads){
  feminineHygieneArray.push('Pads');
}

if(tampons){
  feminineHygieneArray.push('Tampons');
}

if(backpack){
  schoolItemsArray.push('Backpack');
}

if(penandpaper){
  schoolItemsArray.push('Pens/Pencils/Paper');
}

if(composition){
  schoolItemsArray.push('Composition Notebook');
}

if(folder){
  schoolItemsArray.push('Folders/Binders');
}

if(gluestick){
  schoolItemsArray.push('Gluestick/Art Materials');
}

if(spiral){
  schoolItemsArray.push('Spiral Notebooks');
}

if (bodyKit) {
var bodyHygiene_items = ""
} else {
  var bodyHygiene_items = hygieneItemsArray.toString();
}

if (dentalKit) {
  var dentalHygiene_items = ""
} else {
  var dentalHygiene_items = dentalHygieneItemsArray.toString();
}

const hygiene_items = bodyHygiene_items + dentalHygiene_items;
const feminine_hygiene = feminineHygieneArray.toString();
const school_supplies = schoolItemsArray.toString();

//error states stuff
if ( formStudentInitials === "" || gender === "" || ethnicity === "" || relation === "" || grade === "" ||
HRTeacher === "" || studentAgency === "" || studentZip === "" || livingStatus === "" || 
style_pref === "" || sizeType === "" || socks === "" || shoeSize === "" || outfitCombo === "" || pantSize === "" ||
topSize === "") {
    localStorage.setItem("ReferralFormError", true);
  } else if ( sizeType === "Mens" && pantWaist === "") {
    localStorage.setItem("ReferralFormError", true);
  }else if ( livingStatus === "Homeless" && livingSituation === "") {
      localStorage.setItem("ReferralFormError", true);
    } else if ( outfitCombo != "Three Casual Outfits" && uniform_bottoms === "N/A" ) {
      localStorage.setItem("ReferralFormError", true);
    } 
    else if ( outfitCombo != "Three Casual Outfits" && uniform_tops === "N/A") {
      localStorage.setItem("ReferralFormError", true);
    } 
    else {
    localStorage.setItem("ReferralFormError", false);
  }





    return (
        <div>
            <Typography variant='h5' fontWeight={400} style={{padding: "50px", textAlign: "center"}}>
                Nice! Finally, Review your package before submitting
                {(() => {
   if(ReferralFormError === "true"){
    return  <FormHelperText style={{color: "red",textAlign: "center"}}>Please correct errors or fill required fields in previous steps to submit this referral</FormHelperText>
 } else {
   return  <></>
 } 
})()}
            </Typography>
            <form>
              
            <Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
            <Typography style={{padding: "50px", width: "40%"}}>
               <Box sx={{fontWeight: "400", fontSize: "h6.fontSize", paddingBottom: 2, color: 'green'}}>YOUR CONTACT INFO</Box>
               <Box><strong>Referrer: </strong> {referrer_fname} {referrer_lname}</Box>
               <Box><strong>Relation to Student: </strong> {relation}</Box>
               <Box><strong>Agency: </strong> {referrer_agency}</Box>
               <Box><strong>Email: </strong> {referrer_email}</Box>
               <Box><strong>Phone: </strong> {referrer_phone}</Box>
               <Box><strong>Contact Method: </strong> {notificationPreference}</Box>
               <Box><strong>Nearest Pickup Location: </strong><br></br>
               {nearestLocation}
               </Box>
            </Typography>
            
            <Typography style={{padding: "50px", width:"50%"}}>
               <Box sx={{fontWeight: "400", fontSize: "h6.fontSize", paddingBottom: 2, color: 'green'}}>STUDENT INFO</Box>
               <Box><strong>Student: </strong> {formStudentInitials}, {ethnicity} {gender}</Box>
               <Box><strong>Teacher: </strong> {HRTeacher}, {grade} grade</Box>
               <Box><strong>Agency/School: </strong> {studentAgency}</Box>
               <Box><strong>Living Status: </strong> {livingStatus}</Box>
               <Box><strong>Living Situation: </strong> {livingSituation}</Box>
               <Box><strong>Background: </strong> {studentBackground}</Box>
               <Box><strong>Size Type: </strong> {sizeType}</Box>
               <Box><strong>Style Preference: </strong> {style_pref}</Box>
            </Typography>
                </Stack>
                <Divider />
                <Stack spacing={1} direction={{ sm: 'column', md: 'row' }} >
            <Typography style={{padding: "50px", width:"50%"}}>
               <Box sx={{fontWeight: "400", fontSize: "h6.fontSize", paddingBottom: 2, color: 'green'}}>CLOTHING ITEMS</Box>
               <Box><strong>Pant Length/Size: </strong> {pantSize}</Box>
               <Box><strong>Pant Waist: </strong> {pantWaist}</Box>
               <Box><strong>Top Size: </strong> {topSize}</Box>
               <Box><strong>Bra: </strong> {bra}</Box>
               <Box><strong>Include Underwear: </strong> {underwear}</Box>
               <Box><strong>Include Socks: </strong> {socks}</Box>
               <Box><strong>Shoe Size: </strong> {shoeSize}</Box>
               <Box><strong>Outfit Combination: </strong> {outfitCombo}</Box>
               <Box><strong>Uniform Bottom Color(s): </strong> {uniform_bottoms}</Box>
               <Box><strong>Uniform Top Color(s): </strong> {uniform_tops}</Box>
            </Typography>
            
            <Typography style={{padding: "50px", width: "40%"}}>
               <Box sx={{fontWeight: "400", fontSize: "h6.fontSize", paddingBottom: 2, color: 'green'}}>SUPPLY ITEMS</Box>
               <Box><strong>Hygiene Kits: </strong> {hygiene_kit}</Box>
               <Box><strong>Hygiene Items: </strong> {hygiene_items} </Box>
               <Box><strong>Feminine Hygiene: </strong> {feminine_hygiene} </Box>
               <Box><strong>School Supplies: </strong> {school_supplies}</Box>
            </Typography>
</Stack> 

<Divider />

<Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
  <Typography>
  <Box sx={{  m: 1, fontWeight: 800, fontStyle: 'italic', paddingBottom: 0.5, paddingTop: 2 }}>
  Verification (The GCP is designed to help students from low income families who qualify for free or reduced lunch. 
  We ask that you check this box as verification that you are requesting items for a student in need whom, 
  to the best of your knowledge, is unable to obtain necessary items needed for success in school.)
  </Box>
  </Typography>
  </Stack>
  <Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
  <Box sx={{fontStyle: 'italic', paddingBottom: 3}}>
    <FormControlLabel
    control={
    <Checkbox checked={inNeed} onChange={handleSetInNeed}/>
    } label="By checking this box, you verify that you are requesting items for a student in need" /></Box>
</Stack>

<Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
<Typography>
  <Box sx={{  m: 1, fontWeight: 800, fontStyle: 'italic', paddingBottom: 0.5 }}>
  Family Outreach (In an effort to de-stigmatize situational poverty, The GCP asks that you contact the caregiver of the 
  student in need to make them aware of our organization and the referral you have completed for their child.)</Box>
  </Typography>
</Stack>
<Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
<Box sx={{ fontStyle: 'italic', paddingBottom: 6 }}>
  <FormControlLabel
    control={
    <Checkbox checked={outreach} onChange={handleSetOutreach}/>
    } label="By checking this box, you affirm that you will attempt to contact the student's family" /></Box>

</Stack>

<Divider />

<Grid item xs={12} md={12}>
            {(() => {
   if(notificationPreference === 'Email' && inNeed && outreach){
    return <Button 
    color="warning" 
    disabled={disabled}
    size="sm" 
    variant="contained" 
    onClick={() => {
      handleSubmit();
      handleConfirmationEmail();
      handleNext();
      }}>
        Submit Referral
      </Button>;
 } else if(notificationPreference === 'Phone' && inNeed && outreach){
   return <Button 
   color="warning" 
   disabled={disabled}
   size="sm" 
   variant="contained" 
   onClick={() => {
    handleSubmit();
    handleConfirmationText();
    handleNext();
    }}>
       Submit Referral
     </Button>;
 } else if(notificationPreference === 'Both' && inNeed && outreach){
    return <Button 
    color="warning" 
    disabled={disabled}
    size="sm" 
    variant="contained" 
    onClick={() => {
     handleSubmit();
     handleConfirmationEmail()
     handleConfirmationText();
     handleNext();
     }}>
        Submit Referral
      </Button>;
  } else {
    return <Button 
    disabled
    variant="contained">
        Submit Referral
      </Button>;
  }
})()}
                </Grid>
                
            </form>
        </div>
    )
}

export default Confirm;