import React, { useState, useEffect } from 'react'
import Post from '../Post/Post'
import User from '../User/User'
import './Feed.scss'
import FlipMove from 'react-flip-move'
import axios from '../../axios/axios'
import { v4 as uuidv4 } from 'uuid'
import Filter from '../Filter/Filter'

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

  // function onChange (nameValue, value) {
  //   if (nameValue === 'programmingLanguage') setProgrammingLanguage(value)
  //   if (nameValue === 'workHours') setWorkHours(value)
  //   if (nameValue === 'type') setType(value)
  //   if (nameValue === 'location') setLocation(value)
  // }

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
        })
        .catch(error => {
          alert('Axios POST request failed')
        })
    }
  }

  // useEffect(() => {
  //   setFilter(prevState => ({
  //     ...prevState,
  //     pl: programmingLanguage
  //   }))
  //   console.log(filter)
  // }, [programmingLanguage])

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

  return (
    <div>
      <Filter
        location={location}
        type={type}
        programmingLanguage={programmingLanguage}
        workHours={workHours}
        setProgrammingLanguage={setProgrammingLanguage}
      />
      {data.map(item => {
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
