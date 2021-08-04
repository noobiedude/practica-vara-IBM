import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import axios from "../../axios/axios";
import Post from "../Post/Post";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser);

  useEffect(() => {
    axios
      .get(`/profile/${currentUser._id}/posts/`)
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
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
          <Post post={post} />{" "}
        </div>
      );
    });
  }

  return (
    <div
      class="container"
      style={{ "margin-left": "13%", "margin-right": "12%" }}
    >
      <div class="row">
        <div class="col-md-12">
          <div id="content" class="content content-full-width">
            <div class="profile">
              <div class="profile-header">
                <div class="profile-header-cover"></div>
                <div class="profile-header-content">
                  <div class="profile-header-img">
                    <img src={currentUser.image} alt="" />
                  </div>
                  <div class="profile-header-info">
                    <h4 class="m-t-10 m-b-5">{currentUser.username}</h4>
                    <p class="m-b-10">{currentUser.bio}</p>
                    <a href="#" class="btn btn-sm btn-info mb-2">
                      Edit Profile
                    </a>
                  </div>
                </div>
                <ul class="profile-header-tab nav nav-tabs">
                  <li class="nav-item">
                    <a
                      href=" "
                      class="nav-link active show"
                      data-toggle="tab"
                    >
                      POSTS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#about" class="nav-link" data-toggle="tab">
                      ABOUT
                    </a>
                  </li>
                </ul>
              </div>
            </div>



          <div class="profile-content">
            {Posts}
          </div>
            {/* <div class="profile-content">
              <div class="tab-content p-0">
                <div class="tab-pane fade active show" id="profile-post">
                  <ul class="timeline">
                    <li>
                      <div class="timeline-time">
                        <span class="date">today</span>
                        <span class="time">04:20</span>
                      </div>
                      <div class="timeline-icon">
                        <a href="javascript">&nbsp;</a>
                      </div>
                      <div class="timeline-body">
                        <div class="timeline-header">
                          {/* <span class="userimage">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt=""
                            />
                          </span> */}
                          {/* <span class="username">
                            <a href="javascript">Sean Ngu</a> <small></small>
                          </span> */}
                          {/* <span class="pull-right text-muted">18 Views</span> */}
                        {/* </div>
                        <div class="timeline-content">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc faucibus turpis quis tincidunt luctus.
                            Nam sagittis dui in nunc consequat, in imperdiet
                            nunc sagittis.
                          </p>
                        </div>
                        <div class="timeline-likes">
                          <div class="stats-right">
                            <span class="stats-text">259 Shares</span>
                            <span class="stats-text">21 Comments</span>
                          </div>
                          <div class="stats">
                            <span class="fa-stack fa-fw stats-icon">
                              <i class="fa fa-circle fa-stack-2x text-danger"></i>
                              <i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                            </span>
                            <span class="fa-stack fa-fw stats-icon">
                              <i class="fa fa-circle fa-stack-2x text-primary"></i>
                              <i class="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                            </span>
                            <span class="stats-total">4.3k</span>
                          </div>
                        </div>
                        <div class="timeline-footer">
                          <a
                            href="javascript"
                            class="m-r-15 text-inverse-lighter"
                          >
                            <i class="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>{" "}
                            Like
                          </a>
                          <a
                            href="javascript"
                            class="m-r-15 text-inverse-lighter"
                          >
                            <i class="fa fa-comments fa-fw fa-lg m-r-3"></i>{" "}
                            Comment
                          </a>
                          <a
                            href="javascript"
                            class="m-r-15 text-inverse-lighter"
                          >
                            <i class="fa fa-share fa-fw fa-lg m-r-3"></i> Share
                          </a>
                        </div>
                        <div class="timeline-comment-box">
                          <div class="user">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt="some alt stuff"
                            />
                          </div>
                          <div class="input">
                            <form action="">
                              <div class="input-group">
                                <input
                                  type="text"
                                  class="form-control rounded-corner"
                                  placeholder="Write a comment..."
                                />
                                <span class="input-group-btn p-l-10">
                                  <button
                                    class="btn btn-primary f-s-12 rounded-corner"
                                    type="button"
                                  >
                                    Comment
                                  </button>
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */} 


          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
