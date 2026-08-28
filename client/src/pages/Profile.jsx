import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Profile = () => {
  const navigate =useNavigate()
  const server = useSelector((state)=> state.prod.link)
  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    const fetch = async()=>{
      try {
        const res = await axios.get(`${server}/api/user/profile`,
          {withCredentials: true}
        )
        setUserData(res.data.data)
      } catch (error) {
        navigate('/login')
      }
    }
    fetch()
  },[server, navigate])

  if(!userData){
    <div>Данные загружаются ...</div>
  }

  return (
    <div>{userData?.username}</div>
  )
}

export default Profile