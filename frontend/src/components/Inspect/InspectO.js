import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";

function Inspect() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("/posts/" + id).then((response) => {
      setPost(response.data.post);
      console.log(response.data.post);
    });
  }, []);

  let info = <p> Some error text</p>;

  if (post.createdBy !== undefined) {
    const property = Object.values(post.createdBy);
    info = property[3];
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <h3>{info}</h3>
      <h3>{post.createdAt}</h3>
      <span>{post.type}</span>
      <span>{post.workHours}</span>
      <span>{post.location}</span>
      <span>{post.programmingLanguage}</span>
      <p>{post.description}</p>
    </div>
  );
}

export default Inspect;
