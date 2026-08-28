import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from './store/authReducer'

const App = () => {

  const dispatch = useDispatch()
  const server = useSelector((state)=> state.prod.link)
  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get(`${server}/api/user/check-cookie`,
        {withCredentials: true}
      )
      if(res.data.message === true){
        dispatch(authActions.login())
      }
    }
    fetch()
  },[server, dispatch])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App