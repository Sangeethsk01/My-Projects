import React, {useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';


function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(()=>{
        
        // Get a post by id
        axios.get(`http://localhost:3001/posts/byId/${id}`,{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
          setPostObject(response.data)
        });

        // Get all comments of a post
        axios.get(`http://localhost:3001/Comments/${id}`,{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
          setComments(response.data); 
        });

    },[id]); 

  //Delete the post
  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then(()=>{
      navigate('/');
    })
  }


  //Add a new comment
  const addComment = () => {
    axios.post("http://localhost:3001/Comments/", {CommentBody: newComment,  postId: id },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then((response)=>{
      console.log(response.data);
      if(response.data.error){
        alert(response.data.error);
      }
      else {
      const commentToAdd = response.data;
      setComments([...comments, commentToAdd]);
      setNewComment("");
      }
    });
  };

  //Delete a comment
  const deleteComment = (id)=> {
    axios.delete(`http://localhost:3001/Comments/${id}`,{
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(()=>{
      setComments(comments.filter((val)=>{
        return val.id!==id;
      }))
    });
  }

   const editPost = (option) => {
    if(option === "title") {
      let newTitle = prompt("Enter New Title:");
      if(newTitle){
        axios.put("http://localhost:3001/posts/title",{newTitle: newTitle, id: id},{
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(()=>{
          setPostObject({...postObject, title: newTitle});
        });
      }
      
    } else {
      let newText = prompt("Enter New  Post:");
      if(newText){
        axios.put("http://localhost:3001/posts/body",{newText: newText, id: id},{
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(()=>{
          setPostObject({...postObject, body: newText});
        });
      }
    }
   }


  return (
    <div className='postPage'>

      <div className='leftside'>
        <div className="title" onClick={()=>{ if(postObject.UserId === authState.id) {editPost("title");} }}> { postObject.title } </div>
        <div className="postText" onClick={()=>{ if(postObject.UserId === authState.id) {editPost("body");} }}> { postObject.body } </div>
        <div className="footer"> { postObject.username } </div>
        {postObject.username === authState.username &&
        (<button onClick={deletePost}>Delete</button>)}
      </div>

      <div className='rightside'>
      <div className='commentsTitle'>Comments</div>
        <div className='addCommentContainer'>
          <input type='text' placeholder='Comment...' value={newComment} onChange={(event)=>{setNewComment(event.target.value)}}/>
          <button onClick={addComment}>Add Comment</button>
        </div>

        <div className='listOfComments'>
        {comments.map((comment, key)=>{
          return <div key= {key}className='comment'> 
          <div className='user'>{comment.username}</div>
          <div className='commentBody'>
          {comment.CommentBody} </div>
          {authState.status && authState.username === comment.username && <button onClick={()=>{deleteComment(comment.id)}}>x</button> }
          </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default Post
