import React from 'react'
import './Comment.scss'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'

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

function Comment (props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className='comment' key={props.comment._id}>
        <div className='comment-head '>
          <div className='comment-head__logo'>
            <img
              src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
              alt=''
            />
          </div>
          <div className='comment-head__info'>
            <div className='comment-head__name'>
              <p key={props.comment.createdBy.name}>
                {props.comment.createdBy.name}
              </p>
            </div>
            <div className='comment-head__date'>
              <p key={props.comment.createdAt}>{props.comment.createdAt}</p>
            </div>
          </div>
        </div>

        <div className='comment-body'>
          <p className='comment-body__comment' key={props.comment.content}>
            {props.comment.content}
            <IconButton onClick={handleOpen} aria-label='share'>
              <DeleteIcon />
            </IconButton>
          </p>
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
                props.onRemoveComment(props.comment)
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

export default Comment
