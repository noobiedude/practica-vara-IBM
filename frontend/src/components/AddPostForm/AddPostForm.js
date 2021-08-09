import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";

import "./addForm.scss";

function AddPostForm () {
  
      const formik =useFormik({
        initialValues:{}
      })
        
      return (
      <div className="App">
    
    <div className="add-box">
      <h2>Add a post</h2>
      <form>
    <div className="user-box box">
         <select name="type" id="type">
         <option disabled selected value>Type select...</option>
           <option value="">Offer</option>
           <option value="">Request</option>
           </select>
           <label className="user-box"> Type: </label>
    </div>
        <div className="user-box">
        <input name="title" id="title" type="text" />
        <label>Title: </label>
          </div>
         <div className="user-box">
         <input name="description" id="description" type="text" />
          <label >Description</label>
        </div>

        <div className="user-box box">
         <select name="workHours" id="workHours">
         <option value=""  disabled selected value>Work hours select...</option>
           <option value="">Full-time</option>
           <option value="">Part-time</option>
           </select>
           <label className="user-box"> Work hours: </label>
    </div>

    <div className="user-box">
         <input name="location" id="location" type="text" />
          <label >Location</label>
    </div>

    <div className="user-box" >
         <input name="programmingLanguage" id="programmingLanguage" type="text" />
          <label >Programming Language</label>
        </div>

        <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
      </form>
    </div>

    </div>

      )
    

  
    }
    
  


export default AddPostForm;
