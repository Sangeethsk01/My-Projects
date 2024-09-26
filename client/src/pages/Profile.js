import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { useParams } from 'react-router-dom'

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

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
