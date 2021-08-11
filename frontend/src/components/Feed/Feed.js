import React, { useState, useEffect } from 'react'
import Post from '../Post/Post'
import { NavLink } from 'react-router-dom'
import './Feed.scss'
import axios from '../../axios/axios'
import { v4 as uuidv4 } from 'uuid'
import Filter from '../Filter/Filter'
import { Button } from '@material-ui/core'

function Feed () {
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [lastPostId, setLastPostId] = useState('')
  const [onBottom, setOnBottom] = useState(true)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [programmingLanguage, setProgrammingLanguage] = useState('')
  const [workHours, setWorkHours] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [filter, setFilter] = useState({})

  const removePost = postRemoved => {
    axios
      .delete('/posts/' + postRemoved?._id)
      .then(deleted => {
        console.log(deleted.data)
        console.log(deleted)
        axios.post('/posts', { lastPostId }).then(response => {
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
    if (onBottom) {
      getData()
      setOnBottom(false)
    }
  }, [onBottom])

  function getData () {
    if (hasMorePosts) {
      axios
        .post('/posts', { lastPostId })
        .then(response => {
          if (response.data.lastPostId === undefined) setHasMorePosts(false)
          console.log(response.data)

          setData([...data, ...response.data?.posts])

          setLastPostId(response.data.lastPostId)
        })
        .catch(error => {
          alert('Axios POST request failed')
        })
    }
  }

  const firstEvent = e => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // you're at the bottom of the page
      console.log(`reached bottom!`)
      setOnBottom(true)
    }
  }

  useEffect(() => {
    window.addEventListener(`scroll`, firstEvent)
    return () => {
      window.removeEventListener(`scroll`, firstEvent)
    }
  }, [])
  const filtData = data
    .filter(elem => {
      if (programmingLanguage.length === 0) return true
      return elem.programmingLanguage
        .toLowerCase()
        .includes(programmingLanguage.toLowerCase())
    })
    .filter(elem => {
      if (location.length === 0) return true
      return elem.location.toLowerCase().includes(location.toLowerCase())
    })
    .filter(elem => {
      if (workHours.length === 0) return true
      return elem.workHours.toLowerCase().includes(workHours.toLowerCase())
    })
    .filter(elem => {
      if (type.length === 0) return true
      return elem.type.toLowerCase().includes(type.toLowerCase())
    })

  const currentUser = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      {console.log(filtData)}
      <div className='specialElems'>
        <Filter
          location={location}
          type={type}
          programmingLanguage={programmingLanguage}
          workHours={workHours}
          setProgrammingLanguage={setProgrammingLanguage}
          setLocation={setLocation}
          setType={setType}
          setWorkHours={setWorkHours}
        />
        {currentUser ? (
          <NavLink
            to={`/addPost`}
            style={{ textDecoration: 'none', color: '5F9EA0' }}
          >
            <Button variant='outlined' style={{ color: 'black' }}>
              Add Post
            </Button>
          </NavLink>
        ) : null}
      </div>

      {filtData.map(item => {
        return (
          <div key={uuidv4()}>
            <Post post={item} onRemovePost={removePost} />{' '}
          </div>
        )
      })}
    </div>
  )
}
export default Feed
