import React from 'react'
import './Filter.scss'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

function rand () {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle () {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const Filter = props => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (field, event) => {
    // props.field = event.target.value
    // props.onNameChange(field, event.target.value)
    if (field === 'programmingLanguage') {
      props.setProgrammingLanguage(event.target.value)
    }
    console.log(props.programmingLanguage)
    console.log(event.target.value)
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id='programmingLanguage'
        label='Programming Language'
        className='text-input'
        onChange={e => handleChange('programmingLanguage', e)}
        value={props.programmingLanguage}
      />

      <TextField
        id='location'
        label='Location'
        className='text-input'
        onChange={e => handleChange('location', e)}
        value={props.location}
      />

      <InputLabel id='work-hours'>Work Hours</InputLabel>
      <Select
        labelId='work-hours'
        id='Work Hours'
        onChange={e => handleChange('workHours', e)}
        value={props.workHours}
        label='Work Hours'
      >
        <MenuItem value='full-time'>full-time</MenuItem>
        <MenuItem value='part-time'>part-time</MenuItem>
      </Select>

      <InputLabel id='type'>Type</InputLabel>
      <Select
        labelId='type'
        id='Type'
        onChange={e => handleChange('type', e)}
        value={props.type}
        label='Type'
      >
        <MenuItem value='offer'>offer</MenuItem>
        <MenuItem value='request'>request</MenuItem>
      </Select>
    </div>
  )

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}
export default Filter
