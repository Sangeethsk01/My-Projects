import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

    useEffect(()=>{
        
        // Get a post by id
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
          setPostObject(response.data)
        });

        // Get all comments of a post
        axios.get(`http://localhost:3001/Comments/${id}`).then((response)=>{
          setComments(response.data); 
        });

    },[id]); 


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

  return (
    <div className='postPage'>

      <div className='leftside'>
        <div className="title"> { postObject.title } </div>
        <div className="postText"> { postObject.body } </div>
        <div className="footer"> { postObject.author } </div>
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
          {authState.status && authState.username === comment.username && <button onClick={()=>{deleteComment(comment.id)}}>X</button> }
          </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default Post
