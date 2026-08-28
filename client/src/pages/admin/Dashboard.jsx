import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const navigate =useNavigate()
  const server = useSelector((state)=> state.prod.link)
  const [adminData, setAdminData] = useState(null)

  useEffect(()=>{
    const fetch = async()=>{
      try {
        const res = await axios.get(`${server}/api/admin/dashboard`,
          {withCredentials: true}
        )
        setAdminData(res.data.data)
        navigate('/admin')
      } catch (error) {
        navigate('/')
      }
    }
    fetch()
  },[server, navigate])

  if(!adminData){
    <div>Данные загружаются ...</div>
  }

  return (
    <div>
      {adminData?.username}
    </div>
  )
}

export default Dashboard