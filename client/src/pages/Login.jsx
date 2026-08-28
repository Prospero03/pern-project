import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router'
import { authActions } from '../store/authReducer'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate =useNavigate()
    const dispatch = useDispatch()
    const server = useSelector((state)=> state.prod.link)
    const [Inputs, setInputs] = useState({
      username: '',
      passsword: '',
    })
    const change = (e) => {
      const {name, value} = e.target
      setInputs({...Inputs, [name]:value})
    }

    const handler = async(e)=>{
      e.preventDefault()
      try {
        const res = await axios.post(`${server}/api/user/login`,
          Inputs,
          {withCredentials: true}
        )
        dispatch(authActions.login(res.data.role))
        if(res.data.role === 'admin'){
          navigate('/admin')
        }else{
          navigate('/profile')
        }
        
        console.log(res)
        toast(res.data.message)
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }

    return (
      <div>
        <h1>Войти</h1>
        <form onSubmit={handler}>
          <div>
            <label htmlFor=''>username</label>
            <input
              name='username'
              value={Inputs.username}
              type='text'
              required
              onChange={change}  
            />
          </div>
          <div>
            <label htmlFor=''>password</label>
            <input
              name='password'
              value={Inputs.password}
              type='password'
              required
              onChange={change}  
            />
          </div>
          <button>Войти</button>
        </form>
        <Link to="/signup">Регистрация</Link>
      </div>
    )
}

export default Login