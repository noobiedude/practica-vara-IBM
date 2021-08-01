import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
// import axios from "../../axios/axios";
import Modal from "@material-ui/core/Modal";
import * as loginData from "./test.json";
import "./Login.scss";

const Login = (props) => {
  let showHidePassword = false;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      loginData.users.forEach(obj => {
        if (
          values.username === obj.username &&
          values.password === obj.password
        ) {
          localStorage.setItem("user", JSON.stringify(obj));
          props.history.push({ pathname: "/" });
          window.location.reload();
        }
      })

        // axios
        //   .post("/auth/login", values)
        //   .then((response) => {
        //     if (response.data.accessToken) {
        //       localStorage.setItem("user", JSON.stringify(response.data));
        //     }
        //     props.history.push({ pathname: "/" });
        //     window.location.reload();

        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     setOpen(true);
        //   });
    }
  });

  const messageP = Math.random();
  let message;

  if (messageP < 0.2) {
    message = (
      <h3>
        OH... OH... Monkey could not do log in! Monkey not find user or secret
        banana code!
      </h3>
    );
  }

  return (
    <>
      <Container maxWidth="xs" class="container">
        <div class='img'>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
          />
        </div>

        <form onSubmit={formik.handleSubmit} class='form'>
          <TextField
            id="username"
            label="Username"
            class="text-input"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            error={
              formik.errors.username && formik.touched.username ? true : false
            }
            helperText={
              formik.errors.username && formik.touched.username
                ? formik.errors.username
                : ""
            }
          />
          <TextField
            id="password"
            type={showHidePassword ? "text" : "password"}
            label="Password"
            class="text-input"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            error={
              formik.errors.description && formik.touched.description
                ? true
                : false
            }
            helperText={
              formik.errors.description && formik.touched.description
                ? formik.errors.description
                : ""
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        class='modal'
      >
        <div class='paper'>
          {message ? (
            message
          ) : (
            <div>
              {" "}
              <h3>Error</h3>
              <h4>Incorrect username or password</h4>
              <h4>
                Either no user with the given username could be found, or the
                password you gave was wrong. Please check the username and try
                again.
              </h4>
            </div>
          )}
          <div class='buttonsContainer'>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
