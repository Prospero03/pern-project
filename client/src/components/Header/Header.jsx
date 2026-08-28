import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router'
import { toast } from 'react-toastify'
import { authActions } from '../../store/authReducer'

const Header = (props) => {
  const {
    items =[
      {
        name: 'Главная',
        to: '/'
      }
    ],
    items_no_auth =[
      {
        name: 'Войти',
        to: '/login'
      }
    ],
    items_auth =[
      {
        name: 'Выйти',
        to: '/'
      }
    ],
  } = props

  const server = useSelector((state)=> state.prod.link)
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const dispath = useDispatch()
  const navigate = useNavigate()

  const handlerLogout = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${server}/api/user/logout`,
        {},
        {withCredentials: true}
      )
      dispath(authActions.logout())
      navigate('/')
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div>
      <nav>
        {items.map((item, key)=>{
          return(
            <Link key={key} to={item.to}>{item.name}</Link>
          )
        })}
      </nav>
      {!isLoggedIn && (
        <nav>
          {items_no_auth.map((item, key)=>{
            return(
              <Link key={key} to={item.to}>{item.name}</Link>
            )
          })}
        </nav>
      )}

      {isLoggedIn && (
        <nav>
          {items_auth.map((item, key)=>{
            return(
              <Link key={key} to={item.to} onClick={handlerLogout}>{item.name}</Link>
            )
          })}
        </nav>
      )}

    </div>
  )
}

export default Header