import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate =useNavigate()
    const server = useSelector((state)=> state.prod.link)
    const [Inputs, setInputs] = useState({
      username: '',
      email: '',
      passsword: '',
    })
    const change = (e) => {
      const {name, value} = e.target
      setInputs({...Inputs, [name]:value})
    }

    const handler = async(e)=>{
      e.preventDefault()
      try {
        const res = await axios.post(`${server}/api/user/register`,
          Inputs,
          {withCredentials: true}
        )
        navigate('/profile')
        console.log(res)
        toast(res.data.message)
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }
    return (
      <div>
        <h1>Регистрация</h1>
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
            <label htmlFor=''>email</label>
            <input
              name='email'
              value={Inputs.email}
              type='email'
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
          <button>Зарегистроваться</button>
        </form>
        <Link to="/login">Войти</Link>
      </div>
    )
}

export default Signup