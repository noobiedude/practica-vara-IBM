import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import "./Post.scss";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";




const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar }, ref) => {
   
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  @{username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
        </div>
        <div className="post__body">
          
          <img src={image} alt="" />

          {/* <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            {/* <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" /> */}
          {/* </div> */} 
{/* 
          <div className="post__footer ">
            <button className="buttonFooter"> Apasa aici</button>
          </div> */}
          
          


        </div>
        <div className="comment__container">
          <div className="comment__header">
            <div className="comment__avatar"> 
            <Avatar src={avatar} />
            </div>
            <div className="comment__name-date">
            <p>{username} </p>
            <span>2 days ago</span>

            </div>
          </div>
          <div className="comment__body">
            <p> This is a comment</p>
            <button >Reply</button>
          </div>
        </div>

        
      </div>
    );
  }
);

export default Post;
