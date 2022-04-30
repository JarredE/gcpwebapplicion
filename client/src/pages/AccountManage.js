import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function AccountManage() {
  let history = useHistory();
  const [userData, setUserData,] = useState("");
  const [Email, setEmail] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Agency, setAgency] = useState("");
  const [Agency_zipcode, setAgency_zipcode] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [nearest_location, setNearest_location] = useState("");
  const [Notification, setNotification] = useState("");
  const { authState } = useContext(AuthContext);
  const id  = localStorage.id;
  
  const ele = document.getElementById('gcp-splash')
const loading = localStorage.getItem("loadingScreen");
const referralredirect = localStorage.getItem("referralStart");



if(loading === "true"){
  
  ele.classList.add('available');
        
  setTimeout(() => {
    ele.classList.add('gone');
    
  }, 6000)

  
  
}

if(referralredirect === "true"){
 
  setTimeout(() => {
    window.location.replace("/submit-referral");
    
  }, 5000)
}



  useEffect(() => {
    console.log(authState);
    console.log(localStorage);
    

    
   


    axios.get(`http://localhost:3001/auth/basicinfo/?id=${id}`).then((response) => {
      setUserData(response.data);
      localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("Email", response.data.Email);
        localStorage.setItem("Firstname", response.data.Firstname);
        localStorage.setItem("Lastname", response.data.Lastname);
        localStorage.setItem("Agency", response.data.Agency);
        localStorage.setItem("Agency_zipcode", response.data.Agency_zipcode);
        localStorage.setItem("Phonenumber", response.data.Phonenumber);
        localStorage.setItem("PhoneProvider", response.data.PhoneProvider);
        localStorage.setItem("nearest_location", response.data.nearest_location);
        localStorage.setItem("Notification", response.data.Notification);
        localStorage.setItem("Role", response.data.role);
        localStorage.setItem("Self_Notes", response.data.self_notes);
        localStorage.setItem("Assigned_Referrals", response.data.num_assigned);
        localStorage.setItem("Held_Referrals", response.data.num_held);
        localStorage.setItem("Completed_Referrals", response.data.num_completed);
        
        setTimeout(() => {
          localStorage.setItem("loadingScreen", false);
          
        }, 7001)
    });
  }, []);
    
    
      
              

  return (
    <><div className="loginContainer">
      <div className="basicInfo">
        {" "}
        <h1> Username: {userData.username} </h1>
        <h1> First Name: {userData.Firstname} </h1>
        <h1> Last Name: {userData.Lastname} </h1>
        <h1> Email: {userData.Email} </h1>
        <h1> Phone Number: {userData.Phonenumber} </h1>
        <h1> Notification Type: {userData.Notification} </h1>
        <h1> Agency: {userData.Agency} </h1>
          <button
            onClick={() => {
              history.push("/updateInfo");
            }}
          >
            {" "}
            Change My Account Information
          </button>
        

      </div>
    </div></>

  );
}

export default AccountManage;
