import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";


function User() {
    const [error, setError] = useState(false);
    const [user, setUser] = useState([]);
    useEffect(() => {
      axios
        .get("/user")
        .then((response) => {
            setUser(response.data.user);
          console.log(response.data.user)
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    }, []);
  
    let User = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    if (!error) {
        User = user.map((post, index) => {
        return (
          <div key={index}>
  
          <User
            user={user}
            />{" "}
            </div>
        );
      });
    }
  }
  
  export default User;

