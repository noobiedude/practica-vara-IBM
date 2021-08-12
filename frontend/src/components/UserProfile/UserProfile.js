import React, { useState, useEffect } from 'react'
import './UserProfile.scss'
import axios from '../../axios/axios'
import Post from '../Post/Post'

const UserProfile = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState([])
  const [lastPostId, setLastPostId] = useState('')
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [filter, setFilter] = useState({})
  console.log(currentUser)

  const removePost = postRemoved => {
    axios
      .delete('/posts/' + postRemoved?._id)
      .then(deleted => {
        console.log(deleted.data)
        console.log(deleted)
        axios
          .post(
            '/posts',
            { lastPostId },
            {
              params: filter
            }
          )
          .then(response => {
            if (response.data.lastPostId === undefined) setHasMorePosts(false)
            //console.log(response.data);
            setData([...data, ...response.data?.posts])
            setLastPostId(response.data.lastPostId)
            window.location.reload()
          })
      })
      .catch(error => {
        console.log(error)
        alert('Your type of user cannot delete this post!')
      })
  }

  useEffect(() => {
    axios
      .get(`/profile/${currentUser._id}/posts/`)
      .then(response => {
        setPosts(response.data.posts)
        console.log(response.data.posts)
      })
      .catch(error => {
        console.log(error)
        setError(true)
      })
  }, [])
  let Posts
  if (posts === undefined) {
    Posts = <p style={{ textAlign: 'center' }}>This user hasn't posted yet</p>
  } else {
    if (!error) {
      Posts = posts?.map((post, index) => {
        return (
          <div key={index}>
            <Post post={post} onRemovePost={removePost} />{' '}
          </div>
        )
      })
    }
  }

  return (
    <div
      class='container'
      style={{ 'margin-left': '13%', 'margin-right': '12%' }}
    >
      <div class='row'>
        <div class='col-md-12'>
          <div id='content' class='content content-full-width'>
            <div class='profile'>
              <div class='profile-header'>
                <div class='profile-header-cover'></div>
                <div class='profile-header-content'>
                  <div class='profile-header-img'>
                    <img
                      src={
                        'https://i.kym-cdn.com/entries/icons/original/000/037/376/veepihfrbgh31.png'
                      }
                      alt=''
                    />
                  </div>
                  <div class='profile-header-info'>
                    <h4 class='m-t-10 m-b-5'>{currentUser.name}</h4>
                    <p class='m-b-10'>{currentUser.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class='profile-content'>{Posts}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
