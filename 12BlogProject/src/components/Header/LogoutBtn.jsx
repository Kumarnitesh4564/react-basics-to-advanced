import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate("/login") // optional but better UX
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      onClick={logoutHandler}
      className={`px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-200 ${className}`}
    >
      Logout
    </button>
  )
}

export default LogoutBtn