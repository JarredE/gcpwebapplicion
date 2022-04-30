import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";


function UpdateInfo()  {


  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }

  function onButtonClickHandler() {
    window.alert('Password changed')
  };

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    alert('A name was submitted: ' + fName);
    const updatedUserInfo = { Firstname: fName, 
      Lastname: LName, 
      Email: Email, 
      Phonenumber: Phone, 
      Notification: Note, 
      Relationship: Relate, }
    axios.put(`http://localhost:3001/auth/updateUser`, updatedUserInfo, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }
    ).then(async (response) => {
      if(response.status = 200){
        history.push("/AccountManage");
      } else {
        alert(response.data.error);
      }
    });
  }

  const [fName, setFName] = useState();
  const [LName, setLName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Note, setNote] = useState();
  const [Relate, setRelate] = useState();

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

  
    const changePassword = () => {
      axios.put("http://localhost:3001/auth/updateInfo",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          }
        });
    };

  
    return (
      <div class= "loginContainer">
      <div>
        <h1>Change Your Password</h1>
        <input
          type="text"
          placeholder="Old Password..."
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="New Password..."
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button onClick={() =>{
        changePassword()
        onButtonClickHandler()
        }}> Save Changes</button>
        
        <ColoredLine color="Gray" />
      </div>

      <div>
        <form onSubmit={e => {handleSubmit(e)}}>
        <input 
          type="text"
          placeholder="First Name..."
          onChange={e => setFName(e.target.value)}
          />

        <input 
          type="text"
          placeholder="Last Name..."
          onChange={e => setLName(e.target.value)}
          />

        <input
          type="text"
          placeholder="Email..."
          onChange={e => setEmail(e.target.value)}
          />

        <input
          type="text"
          placeholder="Phonenumber..."
          onChange={e => setPhone(e.target.value)}
          />

        <input
          type="text"
          placeholder="Notification..."
          onChange={e => setNote(e.target.value)}
          />

        <input
          type="text"
          placeholder="Relationship..."
          onChange={e => setRelate(e.target.value)}
          />

          <div>
        <input type="submit" value="Save Changes" />  
        </div>

        </form>
      </div>

      </div>

    );
  }
export default UpdateInfo;