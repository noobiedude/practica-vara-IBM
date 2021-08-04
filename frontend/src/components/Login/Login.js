import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import Modal from "@material-ui/core/Modal";
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      axios
        .post("/login", values)
        .then((response) => {
          if (response.data.user) {
            console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          props.history.push({ pathname: "/" });
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setOpen(true);
        });
    },
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
        <div class="img">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
          />
        </div>

        <div>
          <h3 textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </h3>
          <p mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <p as="span">Don&apos;t have an account?</p>
            <a href="/signup">Make an account</a>
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} class="form">
          <TextField
            id="email"
            label="Email"
            class="text-input"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={formik.errors.email && formik.touched.email ? true : false}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
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
        class="modal"
      >
        <div class="paper">
          {message ? (
            message
          ) : (
            <div>
              {" "}
              <h3>Error</h3>
              <h4>Incorrect email or password</h4>
              <h4>
                Either no user with the given email could be found, or the
                password you gave was wrong. Please check the email and try
                again.
              </h4>
            </div>
          )}
          <div class="buttonsContainer">
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
