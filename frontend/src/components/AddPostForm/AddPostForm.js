import { useFormik, withFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";
import "./addForm.scss";

function AddPostForm () {
 
 
  const [selectWork,setSelectWork]=useState('');
 
  let history = useHistory();
      const formik =useFormik({
        initialValues:{
      title:"",
      description:"",
      location:"",
      programmingLanguage:"",

        }, validationSchema: Yup.object({
          title: Yup.string()
            .max(100, "Must be 100 characters or less")
            .min(2, "Must be 2 characters or more")
            .required("Required"),
          description: Yup.string()
            .max(1500, "Must be 1500 characters or less")
            .min(30, "Must be 30 characters or more")
            .required("Required"),
            location: Yup.string()
            .max(100, "Must be 100 characters or less")
            .min(2, "Must be 2 characters or more")
            .required("Required"),
            programmingLanguage: Yup.string()
            .max(100, "Must be 100 characters or less")
            .min(2, "Must be 2 characters or more")
            .required("Required"),
          
        }),
        onSubmit:values=>{
          let post=values;
          post.workHours= selectWork;
          console.log(post)
          axios.post(`/posts/addPost/`,{title:post.title,description:post.description,workHours:post.workHours,location:post.location,programmingLanguage:post.programmingLanguage}).then((response)=>{
            console.log(response)
            history.push({ pathname: "/feed" });
            window.location.reload();
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      })
     
      return (
      <div className="App">
    
    <div className="add-box">
      <h2>Add a post</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="user-box">
        <input onChange={formik.handleChange} value={formik.values.title} name="title" id="title" type="text" onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            } />
        <label>Title: </label>
          </div>
         <div className="user-box">
         <input onChange={formik.handleChange} value={formik.values.description} name="description" id="description" type="text" onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            } />
          <label >Description</label>
        </div>

        <div className="user-box box">
         <select  onChange={(e) => setSelectWork(e.target.value)}name="workHours" id="workHours" >
         <option   selected disabled hidden>Work hours select...</option>
           <option value="full-time">Full-time</option>
           <option value="part-time">Part-time</option>
           </select>
           <label className="user-box"> Work hours: </label>
    </div>

    <div className="user-box">
         <input onChange={formik.handleChange} value={formik.values.location} name="location" id="location" type="text" onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            } />
          <label >Location</label>
    </div>

    <div className="user-box" >
         <input onChange={formik.handleChange} value={formik.values.programmingLanguage} name="programmingLanguage" id="programmingLanguage" type="text" onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            }/>
          <label >Programming Language</label>
        </div>

        <button  type="submit">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </button>
      </form>
    </div>

    </div>

      )
    }
    

export default AddPostForm;
