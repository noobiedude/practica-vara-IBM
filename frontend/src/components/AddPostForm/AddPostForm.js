import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import axios from '../../axios/axios'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
}))
function AddPostForm () {
  const classes = useStyles()
  let history = useHistory()
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
      programmingLanguage: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Required'),
      description: Yup.string()
        .max(1500, 'Must be 1500 characters or less')
        .min(30, 'Must be 30 characters or more')
        .required('Required'),
      workHours: Yup.string()
        .oneOf(['full-time', 'part-time'], 'Invalid workHours')
        .required('Required'),
      location: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Required'),
      programmingLanguage: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Required')
    }),
    onSubmit: values => {
      console.log(values)
      axios
        .post(`/posts/addPost/`, {
          title: values.title,
          description: values.description,
          workHours: values.workHours,
          location: values.location,
          programmingLanguage: values.programmingLanguage
        })
        .then(response => {
          console.log(response)
          history.push({ pathname: '/feed' })
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  return (
    <Container maxWidth='xs'>
      <h1>Add a new Post</h1>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.title}
          name='title'
          label='Title'
          id='title'
          type='text'
          onBlur={formik.handleBlur}
          error={formik.errors.title && formik.touched.title ? true : false}
          helperText={
            formik.errors.title && formik.touched.title
              ? formik.errors.title
              : ''
          }
        />

        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          name='description'
          id='description'
          label='Description'
          type='text'
          onBlur={formik.handleBlur}
          error={
            formik.errors.description && formik.touched.description
              ? true
              : false
          }
          helperText={
            formik.errors.description && formik.touched.description
              ? formik.errors.description
              : ''
          }
        />

        <FormControl
          error={
            formik.errors.workHours && formik.touched.workHours ? true : false
          }
        >
          <InputLabel id='workHours-label'>Work Hours</InputLabel>
          <Select
            labelId='workHours-label'
            id='workHours'
            onChange={formik.handleChange('workHours')}
            value={formik.values.workHours}
            label='workHours'
          >
            <MenuItem value='part-time'>Part-Time</MenuItem>
            <MenuItem value='full-time'>Full-Time</MenuItem>
          </Select>
          {formik.errors.workHours && formik.touched.workHours ? (
            <FormHelperText>{formik.errors.workHours}</FormHelperText>
          ) : (
            ''
          )}
        </FormControl>

        <TextField
          onChange={formik.handleChange}
          value={formik.values.location}
          name='location'
          label='Location'
          id='location'
          type='text'
          onBlur={formik.handleBlur}
          error={
            formik.errors.location && formik.touched.location ? true : false
          }
          helperText={
            formik.errors.location && formik.touched.location
              ? formik.errors.location
              : ''
          }
        />

        <TextField
          onChange={formik.handleChange}
          value={formik.values.programmingLanguage}
          name='programmingLanguage'
          id='programmingLanguage'
          label='Programming Language'
          type='text'
          onBlur={formik.handleBlur}
          error={
            formik.errors.programmingLanguage &&
            formik.touched.programmingLanguage
              ? true
              : false
          }
          helperText={
            formik.errors.programmingLanguage &&
            formik.touched.programmingLanguage
              ? formik.errors.programmingLanguage
              : ''
          }
        />

        <Button variant='outlined' type='submit'>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default AddPostForm
