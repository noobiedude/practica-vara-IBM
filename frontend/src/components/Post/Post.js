import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Post.scss'
import User from '../User/User'
import axios from '../../axios/axios'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    width: 230,
    boxSizing: 'content-box',
    justifyContent: 'space-between',
    backgroundColor: 'ghostwhite',
    marginBottom: 30
  },
  media: {
    height: 0
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  paper: {
    position: 'absolute',
    width: '30%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'black'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  cardHeaderRoot: {
    overflow: 'hidden'
  },
  cardHeaderContent: {
    overflow: 'hidden'
  },
  buttonContinue: {
    color: 'green'
  }
}))

const Post = props => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const date = new Date(props.post.createdAt)

  return (
    <>
      <div>
        <div className='movie_card'>
          <div className='info_section'>
            <div className='movie_header'>
              <img
                className='locandina'
                src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
                alt='some alt stuff'
              />
              <h2>{props.post.title}</h2>
              <h4>@{props.post.createdBy?.name}</h4>
              <div className='minutes'>
                <div>{props.post.type}</div>
                <div>{props.post.workHours}</div>
                <div>{props.post.location}</div>
                <div>{props.post.programmingLanguage}</div>
                <div>{date.toUTCString()}</div>
              </div>
            </div>
            <div className='movie_desc'>
              <p className='text'>{props.post.description}</p>
            </div>
            <div className='movie_social'>
              <NavLink
                to={`/posts/inspect/${props.post._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  variant='outlined'
                  size='small'
                  style={{ marginLeft: '17.5px' }}
                >
                  See Full Post
                </Button>
              </NavLink>

              <IconButton onClick={handleOpen} aria-label='share'>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h3>Are you sure you want to do this?</h3>
          <div className={classes.buttonsContainer}>
            <Button onClick={handleClose} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button
              variant='outlined'
              className={classes.buttonContinue}
              onClick={() => {
                props.onRemovePost(props.post)
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Post
