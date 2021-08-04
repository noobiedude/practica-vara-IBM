import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
// import "../Inspect/Inspect.sass";
import "./Comment.scss";

function Comment(props) {

  const { id } = useParams();
  const [comments, setComment] = useState([]);
  useEffect(() => {
    axios.get("/posts/" + id+"/comments").then((response) => {
      setComment(response.data.comments);
      console.log(response.data.comments);
      
    });
  }, []);
  console.log(comments)

  return (
    <React.Fragment>
      {comments.map((comment)=>(
        <div className="comment"  >
        <div className="comment-head ">
          <div className="comment-head__logo"><img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"/></div>
          <div className="comment-head__info"><div className="comment-head__name">
          <p key={comment.createdBy.name}>{comment.createdBy.name}</p>
          </div>
          <div className="comment-head__date">
          <p key={comment.createdAt}>{comment.createdAt}</p>
          </div>
          </div>
          
        </div>
        <div className="comment-body">
        <p className="comment-body__comment" key={comment.content}>{comment.content}</p>
        <button>Reply</button>
        </div>
        
        </div>
      ))}
      </React.Fragment>
  );
    
    
  
}

export default Comment;
