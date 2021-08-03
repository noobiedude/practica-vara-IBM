import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Post.scss";
import User from "../User/User";
import axios from "../../axios/axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

const Post = (props) => {
  
  return (
    <div>
      <div class="movie_card" id="bright">
        <div class="info_section">
          <div class="movie_header">
            <img
              class="locandina"
              src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              alt="some alt stuff"
            />
            <h2>{props.post.title}</h2>
            <h4>@{props.post.createdBy.name}</h4>
            <div >
            <span class="minutes">{props.post.type}</span>
            <span class="minutes">{props.post.workHours}</span>
            <span class="minutes">{props.post.location}</span>
            <span class="minutes">{props.post.programmingLanguage}</span>
            </div>
            <p class="type">{props.post.createdAt}</p>
          </div>
          <div class="movie_desc">
            <p class="text">{props.post.description}</p>
          </div>
          <div class="movie_social">
            {/* <IconButton aria-label="add to favorites"> */}
              <NavLink
                to={`/posts/inspect/${props.post._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="outlined" size="small" style={{ marginLeft: "17.5px" }}>See Full Post</Button>
              </NavLink>
            {/* </IconButton> */}
          </div>
        </div>
        {/* <div class="blur_back bright_back"></div> */}
        {/* ce e sus va merge doar cand avem optiune de pus poza la postare */}

        {/* <div > <img class="blur_back" src="https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg" alt=""/></div> */}

        <div class="blur_back"></div>
      </div>
    </div>
  );
};

export default Post;
