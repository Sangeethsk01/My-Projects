import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

import { useParams, useNavigate } from 'react-router-dom'

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(()=> {
        // GET USERNAME
        axios.get(`http://localhost:3001/auth/profile/${id}`,{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
            setUsername(response.data.username);
            console.log(username);
          });

        //GET LIST OF POSTS OF USER
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response)=>{
          setListOfPosts(response.data);
          console.log(listOfPosts);
        });
        

    }, [id]);

  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1>Username: {username}</h1>
            {authState.username === username && <button onClick={()=>{navigate("/changepassword")}}> Change Password</button>}
        </div>
        <div className='listOfPosts'>
        <h2>Posts ({listOfPosts.length})</h2>
        {
        listOfPosts.map((value, key) => {
          return <div key={key} className='post'>
                    <div className='title'>{value.title}</div>
                    <div className='body'>{value.body}</div>
                    <div className='footer'><div>{value.username}</div>
                    </div>
            </div>
        } )
      }
        </div>
    </div>
  )
}

export default Profile
