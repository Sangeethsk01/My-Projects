import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
          setPostObject(response.data)
        });
    },[]);

  return (
    <div className='postPage'>
      <div className='leftside'>
        <div className="title"> { postObject.title } </div>
        <div className="postText"> { postObject.body } </div>
        <div className="footer"> { postObject.author } </div>
      </div>
      <div className='rightside'>
        comment section
      </div>
    </div>
  )
}

export default Post
