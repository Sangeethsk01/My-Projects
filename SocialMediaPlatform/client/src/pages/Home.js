import React from 'react';
import axios from "axios"; 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

  useEffect(()=> {
    axios.get("http://localhost:3001/posts").then((response)=>{
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);


  return (
    <div>
       {
        listOfPosts.map((value, key) => {
          return <div className='post' onClick={()=>{navigate(`/post/${value.id}`)}}>
                    <div className='title'>{value.title}</div>
                    <div className='body'>{value.body}</div>
                    <div className='footer'>{value.author}</div>
            </div>;
        } )
      }
    </div>
  )
}

export default Home
