import "../Inspect/Inspect.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";

const AddCommentForm = (props) => {
  const [value, setValue] = useState("");
  const { id } = useParams();
  console.log(id);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    alert("A comment has been submitted: " + value);
    // let x = window.location.pathname.split("/")[3];
    // fetch("http://localhost:3000/posts/" + x + "/comments/", {
    //   method: "POST",
    //   // We convert the React state to JSON and send it as the POST body
    //   body: JSON.stringify(value),
    // }).then(function (response) {
    //   console.log(response);
    //   return response.json();
    // });

    axios
      .post(`/posts/` + id + `/comments `, { content: value })
      .then((response) => {
        console.log(value);
      })
      .catch((error) => {
        alert("Axios POST request failed");
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Add a comment"
        onChange={handleChange}
      />

      <div className="submit-button">
        <button type="submit" className="glow-on-hover">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
