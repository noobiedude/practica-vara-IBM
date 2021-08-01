import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DefaultUserPic from "../../Resources/user.png";
import "./UserProfile.scss";

// const axios = require("axios");

//   constructor(props) {
//     super(props);
//     this.state = {
//     //   user_id: this.props.user_id,
//       username: this.props.username,
//       email: this.props.email,
//       profileImage: this.props.profileImage,
//       msg: this.props.msg,
//       uploadedFile: null,
//     };
//   }
const UserProfile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [updateFile, setUpdateFile] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser);

  //   fetchUserDetails = (user_id) => {
  //     //console.log(user_id);
  //     axios
  //       .get("http://localhost:5000/userapi/getUserDetails/" + user_id, {
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({ email: res.data.results[0].email });
  //         this.setState({ profileImage: res.data.results[0].profileImage });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //  const changeProfileImage = (event) => {
  //   setUpdateFile( event.target.files[0] );
  // };

  //   UpdateProfileHandler = (e) => {
  //     e.preventDefault();
  //     //create object of form data
  //     const formData = new FormData();
  //     formData.append("profileImage", this.state.uploadedFile);
  //     formData.append("user_id", this.state.user_id);

  //     //update-profile
  //     axios
  //       .post("http://localhost:5000/userapi/update-profile/", formData, {
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({ msg: res.data.message });
  //         this.setState({ profileImage: res.data.results.profileImage });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   componentDidMount() {
  //     this.fetchUserDetails(this.state.user_id);
  //   }

  // if (image) {
  //   var imagestr = image;
  //   imagestr = imagestr.replace("public/", "");
  //   var profilePic = "http://localhost:3001/" + imagestr;
  // } else {
  //   profilePic = DefaultUserPic;
  // }

  return (
    // <Container>
    //   <Row>
    //     <Col>
    //       <img src={currentUser.image} alt="profile pic" />
    //     </Col>
    //     <Col>
    //       <h1>User Profile</h1>

    //       <Form className="form">

    //         <p>{bio}</p>

    //         <Form.Group controlId="formCategory1">
    //           <Form.Label>Username</Form.Label>
    //           <Form.Control type="text" defaultValue={username} />
    //         </Form.Group>
    //         <Form.Group controlId="formCategory2">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control type="email" defaultValue={email} />
    //         </Form.Group>

    //         {/* <Form.Group controlId="formCategory4">
    //           <Form.Label>Profile Image</Form.Label>
    //           <Form.Control
    //             type="file"
    //             name="profileImage"
    //             onChange={changeProfileImage}
    //           />

    //         </Form.Group> */}
    //         {/* <Button variant="primary" onClick={this.UpdateProfileHandler}>
    //           Update Profile
    //         </Button> */}
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>

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
                      href="#profile-post"
                      class="nav-link active show"
                      data-toggle="tab"
                    >
                      POSTS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#profile-about" class="nav-link" data-toggle="tab">
                      ABOUT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="profile-content">
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
                          <span class="userimage">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt=""
                            />
                          </span>
                          <span class="username">
                            <a href="javascript">Sean Ngu</a> <small></small>
                          </span>
                          <span class="pull-right text-muted">18 Views</span>
                        </div>
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
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="some alt stuff"/>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
