import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Registration() {
    let navigate = useNavigate();

    const initialValues = {
      username: "",
      password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(16).required("Username is a required field"),
        password: Yup.string().min(4).max(20).required(),
      });
  
      const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth",data).then((response)=>{
          navigate("/login");
        }); 
      };

  return (
    <div className='formPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='formContainer'>
           <label>Username: </label>
           <ErrorMessage name="username" component="span"/>
          <Field 
          id="inputCreatePost"
          name="username"
          placeholder="Enter your username..."
          />

        <label>Password: </label>
           <ErrorMessage name="password" component="span"/>
          <Field 
          type="password"
          id="inputCreatePost"
          name="password"
          placeholder="Your Password..."
          />


          <button type='submit'>Register</button>
        </Form>

      </Formik>
      
    </div>
  )
}

export default Registration
