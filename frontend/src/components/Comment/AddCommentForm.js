import '../Inspect/Inspect.scss'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios/axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'

const AddCommentForm = props => {
  const { id } = useParams()
  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 1))
      console.log(values)

      axios
        .post(`/posts/` + id + `/comments `, { content: values.comment })
        .then(response => {
          // console.log(values)
          window.location.reload()
        })
        .catch(error => {
          alert('Axios POST request failed')
        })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className='formComm'>
      <TextField
        id='comment'
        label='Add Comment'
        class='text-input'
        onChange={formik.handleChange}
        value={formik.values.comment}
        onBlur={formik.handleBlur}
        error={formik.errors.comment && formik.touched.comment ? true : false}
        helperText={
          formik.errors.comment && formik.touched.comment
            ? formik.errors.comment
            : ''
        }
      />

      <div className='submit-button'>
        <button type='submit' className='glow-on-hover'>
          Add
        </button>
      </div>
    </form>
  )
}

export default AddCommentForm
