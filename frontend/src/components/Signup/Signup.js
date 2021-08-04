import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Signup = () => {
  let showHidePassword = false;
  const classes = useStyles();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      type: "",
      description: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      type: Yup.string()
        .oneOf(["Student", "Company"], "Invalid Type")
        .required("Required"),
      description: Yup.string()
        .max(1500, "Must be 1500 characters or less")
        .min(30, "Must be 30 characters or more")
        .required("Required"),
      password: Yup.string()
        .max(30, "Must be 30 characters or less")
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // sa comentam ce e jos
      alert(JSON.stringify(values, null, 5));
      axios
        .post("/signup", values)
        .then((response) => {
          if (response.data.user) {
            console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          history.push({ pathname: "/" });
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Container maxWidth="xs">
        <h1>Make your new account</h1>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            id="name"
            label="Name"
            className="text-input"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            id="email"
            label="Email"
            className="text-input"
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
          <FormControl
            error={formik.errors.type && formik.touched.type ? true : false}
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              onChange={formik.handleChange("type")}
              value={formik.values.type}
              label="Type"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
            </Select>
            {formik.errors.type && formik.touched.type ? (
              <FormHelperText>{formik.errors.type}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <TextField
            id="description"
            label="Description"
            className="text-input"
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
          <TextField
            id="password"
            type={showHidePassword ? "text" : "password"}
            label="Password"
            className="text-input"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            error={
              formik.errors.password && formik.touched.password ? true : false
            }
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Signup;
