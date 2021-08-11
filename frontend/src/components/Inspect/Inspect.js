import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios/axios'
import './Inspect.scss'
import Comment from '../Comment/Comment'
import AddCommentForm from '../Comment/AddCommentForm'

function Inspect () {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [comments, setComment] = useState([])

  useEffect(() => {
    axios.get('/posts/' + id + '/comments').then(response => {
      setComment(response.data.comments)
    })
  }, [])

  useEffect(() => {
    axios.get('/posts/' + id).then(response => {
      setPost(response.data.post)
    })
  }, [])

  const removeComment = CommentRemoved => {
    console.log(CommentRemoved.description)
    axios
      .delete('/posts/' + id + '/comments/' + CommentRemoved._id)
      .then(deleted => {
        if (deleted.data === 'You can only edit your own comment!') {
          alert('Your account cannot delete that comment!')
        }
        console.log(deleted.data)
        console.log(deleted)
        axios.get('/posts/' + id + '/comments').then(response => {
          const Comments = response.data.comments
          console.log(Comments)
          const updateComments = Comments.map(Comment => {
            return {
              ...Comment
            }
          })
          setComment(updateComments)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  let Comments = <p style={{ textAlign: 'center' }}>There are no comments</p>
  if (comments !== undefined) {
    Comments = comments.map(comment => {
      return (
        <div key={comments._id}>
          <Comment onRemoveComment={removeComment} comment={comment} />{' '}
        </div>
      )
    })
  }

  return (
    <div className='post'>
      <div className='post-head'>
        <div className='post-head__avatar avatar'>
          <img
            src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
            alt=''
          />
        </div>

        <div className='post-head__description'>
          <p className='post-head__title'>
            <span>Title:</span>
            {post.title}
          </p>
          <p className='post-head__postedby'>
            <span>Posted by:</span> {post?.createdBy?.name} (
            {post?.createdBy?.type}){' '}
          </p>
          <p className='post-head__date'>
            <span>Date:</span>
            {post.createdAt}
          </p>
        </div>
      </div>
      <div className='post-full-description'>
        <p className='post-full-description__type'>
          {' '}
          <span>Type:</span> {post.type}
        </p>
        <p className='post-full-description__skills'>
          <span>Skills: </span>
          {post.programmingLanguage}
        </p>
        <div className='post-full-description__description'>
          <p>Description: </p>
          <p>{post.description}</p>
        </div>
        <p className='post-full-description__location'>
          <span>Location: </span> {post.location}
        </p>
        <p className='post-full-description__workhours'>
          <span>Work hours: </span> {post.workHours}{' '}
        </p>
      </div>

      {currentUser ? (
        <div className='comments'>
          <h2>Comments:</h2>
          <AddCommentForm></AddCommentForm>
          <div className='comment-section'>{Comments}</div>
        </div>
      ) : null}
    </div>
  )
}

export default Inspect
