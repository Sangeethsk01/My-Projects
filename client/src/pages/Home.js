import React from 'react';
import axios from "axios"; 
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";


function Home() {
    
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext);

  useEffect(()=> {
    if(!localStorage.getItem("accessToken")){
      navigate("/login");
    }
    else{

    // Getting list of posts
    axios.get("http://localhost:3001/posts", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
      console.log(response.data);
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      // Optionally set an error state to show a message to the user
    });
  }
  }, [navigate]);

  // Function to like a post
  const likeAPost = (postId) => {
    if(!localStorage.getItem("accessToken")){
      alert("Please log in first");
      return;
    }
    axios.post("http://localhost:3001/likes",{ PostId: postId},{
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response)=>{
      setListOfPosts(listOfPosts.map((post)=> {
        if(post.id===postId){
          if(response.data.liked){
            setLikedPosts([...likedPosts,postId]);
            return {...post, Likes: [...post.Likes,0]};
          } else {
            setLikedPosts(likedPosts.filter(id => id !==postId));
            const likesArray = post.Likes;
            likesArray.pop();
            return {...post,Likes: likesArray}
          }
  
        }else{
          return post;
        }
      }))
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
                    <div className='footer'><div onClick={()=>{navigate(`/profile/${value.UserId}`)}}>{value.username}</div>
                     <ThumbUpIcon onClick={()=>{likeAPost(value.id)}} className={likedPosts.includes(value.id) ? "liked" : "unliked "}/> 
                    <label>{value.Likes.length}</label></div>
                   
                    
                    
            </div>
        } )
      }
    </div>
  )
}

export default Home
