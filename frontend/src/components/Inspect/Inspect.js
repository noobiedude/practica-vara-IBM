import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import "./Inspect.scss";
import Comment from "../Comment/Comment";

function Inspect() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("/posts/" + id).then((response) => {
      setPost(response.data.post);
      // console.log(response.data.post);
    });
  }, []);

  return (
    <div className="post">
    <div className="post-head">
    <div className="post-head__avatar avatar">
    <img 
             src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
             alt=""
           />
    </div>

    <div className="post-head__description">
      <p className="post-head__title"><span>Title:</span>{post.title}</p>
      <p className="post-head__postedby"><span>Posted by:</span> {post?.createdBy?.name} ({post?.createdBy?.type}){" "}</p>
      <p className="post-head__date"><span>Date:</span>{post.createdAt}</p>
    </div>

    </div>
    <div className="post-full-description">
    <p className="post-full-description__type"> <span>Type:</span> {post.type}</p>
    <p className="post-full-description__skills"><span>Skills: </span>{post.programmingLanguage}</p>
    <div className="post-full-description__description" >
    <p >Description: </p>
    <p>{post.description}</p>
    </div>
    <p className="post-full-description__location"><span>Location: </span> {post.location}</p>
    <p className="post-full-description__workhours"><span>Work hours: </span> {post.workHours} </p>
  </div>
    <div className="comments">
      <h2>Comments:</h2>
      <form>
        <input type="text" name="Comment"  placeholder="Add a comment"/>
        
       <div className="submit-button">
       <button className="glow-on-hover">Add</button>
       </div>

      </form>
      <div className="comment-section">
      <Comment/>
      </div>
    </div>

    </div>
    
  );
  
}

export default Inspect;