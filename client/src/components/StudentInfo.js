import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import {styled} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack'
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});



const CssSelect = styled(Select)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiInputBase-input': {
    borderColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

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

    const stylePreferences = [
        'Artsy',
        'Biker',
        'Bohemian',
        'Business Casual',
        'Casual Chic',
        'Cowgirl',
        'E-Girl',
        'Ethnic Fashion',
        'Flamboyant',
        'Formal',
        'Geeky Chic',
        'Girly',
        'Goth',
        'Grunge',
        'Hip Hop',
        'Modest',
        'Preppy',
        'Punk',
        'Retro/Vintage',
        'Rocker',
        'Skateboarder',
        'Sporty',
        'Streetwear',
        'Tomboy'
      ];

      function getStyles(stylePreference, styleName, theme) {
        return {
          fontWeight:
            styleName.indexOf(stylePreference) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

const StudentInfo = () => {

    const theme = useTheme();
    //const referralformerror is for validation alert
    const ReferralFormError = localStorage.getItem("ReferralFormError");

    const [formStudentInitials, setStudentInitials] = useState('');

    const handleSetStudentInitials = (event) => {
      setStudentInitials(event.target.value);
    };
    const [gender, setGender] = useState('');
  
    const handleSetGender = (event) => {
      setGender(event.target.value);
    };
  
    const [ethnicity, setEthnicity] = useState('');
  
    const handleSetEthnicity = (event) => {
      setEthnicity(event.target.value);
    };
  
    const [relation, setRelation] = useState('');
  
    const handleSetRelation = (event) => {
      setRelation(event.target.value);
    };
  
    const [grade, setGrade] = useState('');
  
    const handleSetGrade = (event) => {
      setGrade(event.target.value);
    };
  
    const [HRTeacher, setHRTeacher] = useState("");
  
    const handleSetHRTeacher = (event) => {
      setHRTeacher(event.target.value);
    };
  
    const [studentAgency, setStudentAgency] = useState("");
  
    const handleSetStudentAgency = (event) => {
      setStudentAgency(event.target.value);
    };
  
    const [studentZip, setStudentZip] = useState("");
  
    const handleSetStudentZip = (event) => {
      setStudentZip(event.target.value);
    };

    const [livingStatus, setLivingStatus] = useState('');
  
    const handleSetLivingStatus = (event) => {
      setLivingStatus(event.target.value);
    };
  
    const [livingSituation, setLivingSituation] = useState('');
  
    const handleSetLivingSituation = (event) => {
      setLivingSituation(event.target.value);
    };
  
    const [studentBackground, setStudentBackground] = useState('');
  
    const handleSetBackground = (event) => {
      setStudentBackground(event.target.value);
    };
      

    const [styleName, setStyleName] = useState([]);

    const handleSetStyle = (event) => {
      const {
        target: { value },
      } = event;
          setStyleName(
        typeof value === 'string' ? value.split(',') : value,
          );
      };

      const [styleManual, setStyleManual] = useState('');
  
      const handleSetStyleManual = (event) => {
        setStyleManual(event.target.value);
      };

      const [studentInfoValues, setStudentInfoValues] = useState({});
      const studentData = localStorage.getItem("StudentInfo");
      const savedValues = JSON.parse(studentData);
     
      const resumeStudentInfo = localStorage.getItem("resumeStudentInfo");
      useEffect (() => {
          const saveValues = { formStudentInitials, gender, ethnicity, relation,
            grade, HRTeacher, studentAgency, studentZip, livingStatus, livingSituation, studentBackground, styleName, styleManual}
            localStorage.setItem("StudentInfo", JSON.stringify(saveValues));

            localStorage.setItem("resumeStudentInfo", true);

            if (livingStatus != "") {
              setStatusError(false);
            }
            if (formStudentInitials != "") {
              setInitialError(false);
            }
            if (gender != "") {
              setGenderError(false);
            } 
            if (ethnicity != "") {
              setEthnicityError(false);
            } 
            if (relation != "") {
              setRelationError(false);
            } 
            if (grade != "") {
              setGradeError(false);
            } 
            if (HRTeacher !=""){
              setTeacherError(false);
            } 
            if(studentAgency !=""){
              setAgencyError(false);
            } 
            if(studentZip != "" ){
              setZipError(false);
            } 
            if (livingStatus === "Homeless" && livingSituation === ""){
              setSituationError(true);
            } else {
              setSituationError(false)
            }
            if (styleName.length != 0) {
              setStyleError(false);
            }
      });
    
      useEffect (() => {
if(resumeStudentInfo === "true"){
        setStudentInfoValues(savedValues.studentInfoValues);
         setStudentInitials(savedValues.formStudentInitials);
         setGender(savedValues.gender);
         setEthnicity(savedValues.ethnicity);
         setRelation(savedValues.relation);
         setGrade(savedValues.grade);
         setHRTeacher(savedValues.HRTeacher);
         setStudentAgency(savedValues.studentAgency);
         setStudentZip(savedValues.studentZip);
         setLivingStatus(savedValues.livingStatus);
         setLivingSituation(savedValues.livingSituation);
         setStudentBackground(savedValues.studentBackground);
        setStyleName(savedValues.styleName);
        setStyleManual(savedValues.styleManual);

        if (livingStatus === "") {
          setStatusError(true);
        } 
        
        if (formStudentInitials ===""){
          setInitialError(true);
        } 
        if (HRTeacher ===""){
          setTeacherError(true);
        } 
        if(studentAgency ===""){
          setAgencyError(true);
        } 
        if(studentZip === ""){
          setZipError(true);
        } 
        if (gender === "") {
          setGenderError(true);
        } 
        if (ethnicity === "") {
          setEthnicityError(true);
        } 
        if (relation === "") {
          setRelationError(true);
        } 
        if (grade === "") {
          setGradeError(true);
        } 
        
        if (styleName.length === 0) {
          setStyleError(true);
        }
}

     }, []);

     const [initialErrorState, setInitialError] = React.useState(false);
     const [genderErrorState, setGenderError] = React.useState(false);
     const [ethnicityErrorState, setEthnicityError] = React.useState(false);
     const [relationErrorState, setRelationError] = React.useState(false);
     const [gradeErrorState, setGradeError] = React.useState(false);
     const [teacherErrorState, setTeacherError] = React.useState(false);
     const [agencyErrorState, setAgencyError] = React.useState(false);
     const [zipErrorState, setZipError] = React.useState(false);
     const [statusErrorState, setStatusError] = React.useState(false);
     const [situationErrorState, setSituationError] = React.useState(false);
     const [styleErrorState, setStyleError] = React.useState(false);
     
     if ( initialErrorState || genderErrorState || ethnicityErrorState || relationErrorState || gradeErrorState
      || teacherErrorState || agencyErrorState || zipErrorState || statusErrorState || situationErrorState ||
      styleErrorState) {
        localStorage.setItem("ReferralFormError", true);
      } else {
        localStorage.setItem("ReferralFormError", false);
      }
  

    return (
        <div>
            <Typography variant='h5' fontWeight={400} style={{padding: "50px", textAlign: "center"}}>
                Now let's collect the student's info
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
            <Stack spacing={3} direction="column" >
                <CssTextField
                label="Student's Initials"
                variant="outlined"
                defaultValue=""
                value={formStudentInitials}
                onChange={handleSetStudentInitials}
                style={{width: "100%", paddingBottom: "25px"}}
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" && formStudentInitials === "") {
                    setInitialError(true);
                  } else if (e.key != "Enter"){
                   setInitialError(false);
                  }
          }}
                />
                {(() => {
                if(initialErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "10px"}}>Initials required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                <Stack spacing={3} direction="column" sx={{ width: "25%"}} >
                <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <CssSelect
          labelId="gender-label"
          id="gender"
          defaultValue=""
          value={gender}
          label="Gender"
          fullWidth
          onChange={handleSetGender}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (gender === "") {
              setGenderError(true);
            } 
    }}
        >
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
        </CssSelect>
      </FormControl>
      {(() => {
                if(genderErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "10px"}}>Gender required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
      </Stack>
      <Stack spacing={3} direction="column" sx={{ width: "50%"}} >
      <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
        <Select
          labelId="ethnicity-label"
          id="ethnicity"
          defaultValue=""
          value={ethnicity}
          label="Ethnicity"
          fullWidth
          onChange={handleSetEthnicity}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (ethnicity === "") {
              setEthnicityError(true);
            } 
    }}
        >
          <MenuItem value='American Indian or Alaska Native'>American Indian or Alaska Native</MenuItem>
          <MenuItem value='Asian'>Asian</MenuItem>
          <MenuItem value='Black or African American'>Black or African American</MenuItem>
          <MenuItem value='Hispanic or Latino'>Hispanic or Latino</MenuItem>
          <MenuItem value='Multi-Racial'>Multi-Racial</MenuItem>
          <MenuItem value='Native Hawaiian or Other Pacific Islander'>Native Hawaiian or Other Pacific Islander</MenuItem>
          <MenuItem value='White'>White</MenuItem>
        </Select>
      </FormControl>
      {(() => {
                if(ethnicityErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                </Stack>
                <Stack spacing={3} direction="row" >
                <Stack spacing={3} direction="column" sx={{ width: "35%"}} >
                <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="relation-label">Relation to Student</InputLabel>
        <Select
          labelId="relation-label"
          id="relation"
          defaultValue=""
          value={relation}
          label="Relation to Student"
          fullWidth
          onChange={handleSetRelation}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (relation === "") {
              setRelationError(true);
            } 
    }}
        >
          <MenuItem value='Case Manager'>Case Manager</MenuItem>
          <MenuItem value='Counselor'>Counselor</MenuItem>
          <MenuItem value='District Staff'>District Staff</MenuItem>
          <MenuItem value='Family Liaison'>Family Liaison</MenuItem>
          <MenuItem value='Teacher'>Teacher</MenuItem>
          <MenuItem value='Social Worker'>Social Worker</MenuItem>
        </Select>
      </FormControl>
      {(() => {
                if(relationErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
      </Stack>
      <Stack spacing={3} direction="column" sx={{ width: "25%"}} >
      <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="grade-label">Grade Level</InputLabel>
        <Select
          labelId="grade-label"
          id="grade"
          defaultValue=""
          value={grade}
          label="Grade Level"
          fullWidth
          onChange={handleSetGrade}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (grade === "") {
              setGradeError(true);
            } 
    }}
        >
          <MenuItem value='Pre-K'>Pre-K</MenuItem>
          <MenuItem value='Kindergarten'>Kindergarten</MenuItem>
          <MenuItem value='1st'>1st</MenuItem>
          <MenuItem value='2nd'>2nd</MenuItem>
          <MenuItem value='3rd'>3rd</MenuItem>
          <MenuItem value='4th'>4th</MenuItem>
          <MenuItem value='5th'>5th</MenuItem>
          <MenuItem value='6th'>6th</MenuItem>
          <MenuItem value='7th'>7th</MenuItem>
          <MenuItem value='8th'>8th</MenuItem>
          <MenuItem value='9th'>9th</MenuItem>
          <MenuItem value='11th'>11th</MenuItem>
          <MenuItem value='12th'>12th</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
      {(() => {
                if(gradeErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
      </Stack>
      <Stack spacing={3} direction="column" sx={{ width: "40%"}} >
      <CssTextField
                label="Homeroom Teacher"
                variant="outlined"
                defaultValue=""
                value={HRTeacher}
                onChange={handleSetHRTeacher}
                style={{width: "100%", paddingBottom: "25px"}}
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" && HRTeacher === "") {
                    setTeacherError(true);
                  } else if (e.key != "Enter"){
                   setTeacherError(false);
                  }
          }}
                />
                {(() => {
                if(teacherErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                </Stack>
               
                <Stack spacing={3} direction="row" >
                <Stack spacing={3} direction="column" sx={{ width: "50%"}}>
                <CssTextField
                label="Agency / School Name"
                variant="outlined"
                defaultValue=""
                value={studentAgency}
                onChange={handleSetStudentAgency}
                style={{width: "100%", paddingBottom: "25px"}}
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" && studentAgency === "") {
                    setAgencyError(true);
                  } else if (e.key != "Enter"){
                   setAgencyError(false);
                  }
          }}
                />
                {(() => {
                if(agencyErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                <Stack spacing={3} direction="column" sx={{ width: "20%"}}>
                <CssTextField
                label="Zipcode"
                variant="outlined"
                defaultValue=""
                value={studentZip}
                onChange={handleSetStudentZip}
                style={{width: "100%", paddingBottom: "25px"}}
                onKeyUp= {(e) => {
                  if (e.key === "Backspace" && studentZip === "") {
                    setZipError(true);
                  } else if (e.key != "Enter"){
                   setZipError(false);
                  }
          }}

                />
                {(() => {
                if(zipErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                <Stack spacing={3} direction="column" sx={{ width: "30%"}}>
                <FormControl  sx={{ width: "100%", paddingBottom: "25px"}}>
        <InputLabel id="living-status-label">Living Status</InputLabel>
        <Select
          labelId="living-status-label"
          id="living-status"
          defaultValue=""
          value={livingStatus}
          label="Living Status"
          fullWidth
          onChange={handleSetLivingStatus}
          MenuProps={{ disableScrollLock: true }}
          onClick= {() => {
            if (livingStatus === "") {
              setStatusError(true);
            }
    }}
        >
          <MenuItem value='Homeless'>Homeless</MenuItem>
          <MenuItem value='Not Homeless'>Not Homeless</MenuItem>
        </Select>
      </FormControl>
      {(() => {
                if(statusErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
                </Stack>
                </Stack>

                {(() => {
   if(livingStatus === 'Homeless'){
    return <Stack spacing={3} direction="row" >
      <Stack spacing={3} direction="column" sx={{ width: "100%"}}>
             <FormControl  sx={{  paddingBottom: "25px"}}>
        <InputLabel id="living-situation-label">Please tell us the student's living situation</InputLabel>
        <Select
          labelId="living-situation-label"
          id="living-situation"
          defaultValue=""
          value={livingSituation}
          label="Please tell us the student's living situation"
          fullWidth
          onChange={handleSetLivingSituation}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value='Living in Shelter'>Living in Shelter</MenuItem>
          <MenuItem value='Living With Family Member'>Living With Family Member</MenuItem>
          <MenuItem value='Living in Motel/Hotel'>Living in Motel/Hotel</MenuItem>
          <MenuItem value='Living in Vehicle/Car'>Living in Vehicle/Car</MenuItem>
          <MenuItem value='Other'>Other(please specify with student background)</MenuItem>
        </Select>
      </FormControl>  
      {(() => {
                if(situationErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()} 
      </Stack>
    </Stack>
 } else {
   return  <>
   </>
 } 
})()}

                <Stack spacing={3} direction="row" >
                <CssTextField
          value={studentBackground}
          defaultValue=""
          variant="outlined"
          label="Please tell us about the student and his/her background, for the request."
          multiline
          rows={4}
          style={{width: "100%", paddingBottom: "25px"}}
          onChange={handleSetBackground}
        />
                </Stack>
                <Stack spacing={3} direction="row" >
                <Stack spacing={3} direction="column" sx={{ width: "100%"}} >
                <FormControl sx={{ paddingBottom: "25px"}}>
        <InputLabel id="style-preference-label">Student Clothing Style Preferences</InputLabel>
        <Select
          labelId="style-preference-label"
          id="style-preference"
          multiple
          value={styleName}
          onChange={handleSetStyle}
          input={<OutlinedInput id="select-multiple-chip" label="Student Clothing Style Preferences" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          onClick= {() => {
            if (styleName === "") {
              setStyleError(true);
            }
    }}
        >
          {stylePreferences.map((stylePreference) => (
            <MenuItem
              key={stylePreference}
              value={stylePreference}
              style={getStyles(stylePreference, styleName, theme)}
            >
              {stylePreference}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>If you are unsure of which style to select, tell us the student's style in your own words, below.</FormHelperText>
      </FormControl>
      {(() => {
                if(styleErrorState){
                  return  <FormHelperText style={{color: "red", marginTop: -20, paddingBottom: "25px"}}>Required</FormHelperText>
                } else {
                  return  <></>
                } 
                })()}
      </Stack>
                </Stack>
                <Stack spacing={3} direction="row" >
                <CssTextField
                variant="outlined"
                defaultValue=""
                value={styleManual}
                onChange={handleSetStyleManual}
                style={{width: "100%", paddingBottom: "25px"}}
                />
                </Stack>
            </form>
        </div>
    )
}

export default StudentInfo;