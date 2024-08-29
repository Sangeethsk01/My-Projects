import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost() {

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    body: "",
    author: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    body: Yup.string().required("You must write something"),
    author: Yup.string().min(3).max(16).required("Username is a required field"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts",data).then((response)=>{
      navigate("/");
    });
  }; 
   
 


  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='createPostForm'>
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field 
          id="inputCreatePost"
          name="title"
          placeholder="(Ex. Quick Tips...)"
          />
           <label>Post: </label>
           <ErrorMessage name="body" component="span"/>
          <Field 
          id="inputCreatePost"
          name="body"
          placeholder="(Ex. Feeling good...)"
          />
           <label>Username: </label>
           <ErrorMessage name="author" component="span"/>
          <Field 
          id="inputCreatePost"
          name="author"
          placeholder="(Ex. Your username...)"
          />

          <button type='submit'>Create Post</button>
        </Form>

      </Formik>
      
    </div>
  )
}

export default CreatePost
