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
      <div class="movie_card" >
        <div class="info_section">
          <div class="movie_header">
            <img
              class="locandina"
              src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              alt="some alt stuff"
            />
            <h2>{props.post.title}</h2>
            <h4>@{props.post.createdBy?.name}</h4>
            <div class="minutes">
              <div>{props.post.type}</div>
              <div>{props.post.workHours}</div>
              <div>{props.post.location}</div>
              <div>{props.post.programmingLanguage}</div>
              <div >{props.post.createdAt}</div>
            </div>
            {/* <p class="type">{props.post.createdAt}</p> */}
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
              <Button
                variant="outlined"
                size="small"
                style={{ marginLeft: "17.5px" }}
              >
                See Full Post
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
