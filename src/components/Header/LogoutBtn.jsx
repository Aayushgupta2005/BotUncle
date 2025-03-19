import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
function LogoutBtn({className='',...props}) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }
  return (
    <button
    onClick={logoutHandler}
    className={`${className}`}
    >Logout</button>
  )
}

export default LogoutBtn