import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function ChangePassword() {
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
let navigate = useNavigate();

const updatePassword = () =>{
    if (!oldPassword || !newPassword || !confirmPassword){
        alert("All fields are mandatory");
        return;
    }
    if (newPassword !== confirmPassword){
        alert("Passwords do not match");
        return;
    }
    axios.put("http://localhost:3001/auth/changepassword",{
        oldPassword: oldPassword,
        newPassword: newPassword,
    }, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=> {
        if(response.data.error){
            alert(response.data.error);
        }else{
            alert(response.data);
        navigate('/');
        }
    })
}


  return (
    <div className='changePasswordContainer'>
      <h1>Change Your Password</h1>
      <label>Current Password</label>
      <input type="password" placeholder="Old Password..." onChange={(event)=>{setOldPassword(event.target.value);}}/>
      <label>New Password</label>
      <input type="password" placeholder="New Password..." onChange={(event)=>{setNewPassword(event.target.value);}}/>
      <label>Confirm new Password</label>
      <input type="password" placeholder="New Password..." onChange={(event)=>{setConfirmPassword(event.target.value);}}/>
      <button onClick={updatePassword}>Save Changes</button>

    </div>
  )
}

export default ChangePassword
