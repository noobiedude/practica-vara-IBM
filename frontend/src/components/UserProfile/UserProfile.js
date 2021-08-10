import React, { useState, useEffect } from 'react'
import './UserProfile.scss'
import axios from '../../axios/axios'
import Post from '../Post/Post'

const UserProfile = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  console.log(currentUser)

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

  let Posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
  if (!error) {
    Posts = posts?.map((post, index) => {
      return (
        <div key={index}>
          <Post post={post} />{' '}
        </div>
      )
    })
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
                    <img src={currentUser.image} alt='' />
                  </div>
                  <div class='profile-header-info'>
                    <h4 class='m-t-10 m-b-5'>{currentUser.username}</h4>
                    <p class='m-b-10'>{currentUser.bio}</p>
                    <a href='#' class='btn btn-sm btn-info mb-2'>
                      Edit Profile
                    </a>
                  </div>
                </div>
                <ul class='profile-header-tab nav nav-tabs'>
                  <li class='nav-item'>
                    <a href=' ' class='nav-link active show' data-toggle='tab'>
                      POSTS
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a href='#about' class='nav-link' data-toggle='tab'>
                      ABOUT
                    </a>
                  </li>
                </ul>
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
