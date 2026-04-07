import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthLayout({children, authentication = true}) {
    const [loading, setLoading] = useState(true) 
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
        
      if(authentication && !authStatus) {
        navigate('/login')
      } else if(!authentication && authStatus) {
        navigate('/')
      }
      setLoading(false)
    }, [authStatus, navigate, authentication])
    
  return loading ? <h1>Loading...</h1>: <>{children}</>
}

