import React, { useState, useEffect } from "react";
// import TweetBox from "./TweetBox";
import Post from "../Post/Post";
import User from "../User/User";
import "./Feed.scss";
import FlipMove from "react-flip-move";
import axios from "../../axios/axios";

function Feed() {
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts)
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  let Posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
  if (!error) {
    Posts = posts.map((post, index) => {
      return (
        <div key={index}>

        <Post
          post={post}
          />{" "}
          </div>
      );
    });
  }

  return (
    <div className="feed">
      {/* <div className="feed__header"> */}
      {/* </div> */}

      {/* <TweetBox /> */}

      {Posts}
    </div>
  );
}

export default Feed;
