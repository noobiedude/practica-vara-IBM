import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import "./Inspect.sass";
import Comment from "../Comment/Comment";

function Inspect() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("/posts/" + id).then((response) => {
      setPost(response.data.post);
      console.log(response.data.post);
    });
  }, []);

  let name = <p> Some error text</p>;
  let typeOf = <p> Some error text</p>;
  let comm = <p> Some error text</p>;


  if (post.createdBy !== undefined) {
    const property = Object.values(post.createdBy);
    name = property[3];
    typeOf = property[1];
  }

  
  if (post.comments !== undefined) {
    comm = post.comments.map((comment, index)=>{
      return (
        <div key={index}>

        <Comment
          comm={comment}
          />{" "}
          </div>
      );
    })
  }

  return (
    <div class="test">
      <div class="plx-card gold">
        <div class="pxc-avatar">
          <img
            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
            alt=""
          />
        </div>
        <div class="pxc-subcard">
          <div class="pxc-title">{post.title}</div>
          <div class="pxc-sub">
            {" "}
            {name} ({typeOf}){" "}
          </div>
          <div class="pxc-feats">
            <span>{post.description}</span>
          </div>
          <div class="pxc-tags">
            <div>{post.type}</div>
            <div>{post.workHours}</div>
            <div>{post.location}</div>
            <div>{post.programmingLanguage}</div>
          </div>
          <div class="bottom-row">
            <div class="pxc-info">
              <div class="region">{post.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        {comm}
      </div>

    </div>
  );
}

export default Inspect;
