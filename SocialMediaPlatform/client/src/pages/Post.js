import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
          setPostObject(response.data)
        });

        axios.get(`http://localhost:3001/Comments/${id}`).then((response)=>{
          setComments(response.data); 
        });

    },[]);

  const addComment = () => {
    axios.post("http://localhost:3001/Comments/", {CommentBody: newComment,  postId: id }).then((response)=>{
      const commentToAdd = {CommentBody: newComment};
      setComments([...comments, commentToAdd]);
      setNewComment("");
    });
  };

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
          return <div key= {key}className='comment'> {comment.CommentBody} </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default Post
