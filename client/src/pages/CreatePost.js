import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {

  const {authState} = useContext(AuthContext);

 

  let navigate = useNavigate();

  useEffect(()=> {
    if(!authState.status){
      navigate("/login");
    } ;
  }, [] );

  const initialValues = {
    title: "",
    body: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    body: Yup.string().required("You must write something"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts",data,{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
      navigate("/");
    });
  }; 
   
 


  return (
    <div className='formPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='formContainer'>
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
           

          <button type='submit'>Create Post</button>
        </Form>

      </Formik>
      
    </div>
  )
}

export default CreatePost
