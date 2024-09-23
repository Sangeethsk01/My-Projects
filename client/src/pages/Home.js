import React from 'react';
import axios from "axios"; 
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Home() {
   
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext);

  useEffect(()=> {
    // Getting list of posts
    axios.get("http://localhost:3001/posts").then((response)=>{
      console.log(response.data);
      setListOfPosts(response.data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      // Optionally set an error state to show a message to the user
    });

  }, []);

  const likeAPost = (postId) => {
    axios.post("http://localhost:3001/likes",{ PostId: postId},{
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response)=>{
      alert(response.data);
    })
  }


  return (
    <div>
      {authState.status && (
        <h2 className='welcomemsg'> Hello, {authState.username}</h2>
      )}

       {
        listOfPosts.map((value, key) => {
          return <div key={key} className='post'>
                    <div className='title'>{value.title}</div>
                    <div className='body' onClick={()=>{navigate(`/post/${value.id}`)}}>{value.body}</div>
                    <div className='footer'>{value.author}<button onClick={()=>{likeAPost(value.id)}}>Like</button>
                    <label>{value.Likes.length}</label></div>
            </div>
        } )
      }
    </div>
  )
}

export default Home
