import React from 'react';
import { CSVLink } from "react-csv";
import { useEffect, useState} from "react";
import axios from "axios";
import Button from '@mui/material/Button';

 
function StudentReportGen() {
    const [referralData, setReferralData,] = useState("");

    const headers = [
        { label: "ID#", key: "id" },
        { label: "Student Initials", key: "student_initials" },
        { label: "Student Agency", key: "student_agency" },
        { label: "Student Agency Zipcode", key: "student_agency_zip" },
        { label: "Relation", key: "relation" },
        { label: "HomeRoom Teacher", key: "hr_teacher" },
        { label: "Grade Level", key: "grade_level" },
        { label: "Gender", key: "gender" },
        { label: "Ethinicty", key: "ethnicity" },
        { label: "Living Status", key: "living_status" },
        { label: "Living Status Note", key: "living_status_note" },
        { label: "Background", key: "background" },
        { label: "Style Preference", key: "style_pref" },
        { label: "Size Type", key: "size_type" },
        { label: "Pant Size", key: "pant_size" },
        { label: "Pant Waist", key: "pant_waist" },
        { label: "Top Size", key: "top_size" },
        { label: "Outfit Combo", key: "outfit_combo" },
        { label: "Bottom Color", key: "bottom_color" },
        { label: "Top Color", key: "top_colors" },
        { label: "Bra Info", key: "bra_info" },
        { label: "Underwear", key: "underwear" },
        { label: "Shoe Size", key: "shoe_size" },
        { label: "Socks", key: "socks" },
        { label: "Hygiene Kit", key: "hygiene_kit" },
        { label: "Hygiene Items", key: "hygiene_items" },
        { label: "Feminie Hygiene", key: "feminine_hygiene" },
        { label: "School Supplies", key: "school_supplies" },
        { label: "Volunteer", key: "volunteer" },
        { label: "Fufilled", key: "updatedAt" },
      
      ];

      
       
      const data = referralData;

      const csvreport = {
        data: data,
        headers: headers,
        filename: 'StudentReport.csv'
      };

    

  //get all referrals
  useEffect(() => {
    getAllReferrals();
    }, []);

const getAllReferrals = () => {
  axios.get(`http://localhost:3001/referrals/reportgen`).then((response) => {  
      setReferralData(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

  return (
      <CSVLink style={{textDecoration: 'none'}} {...csvreport}><Button variant='contained' color='primary'>Download</Button></CSVLink>
  );
}


 
export default StudentReportGen;