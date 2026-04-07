import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { logout, login } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({
            $id: user.$id,
            name: user.name,
            email: user.email
          }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center"><p className="text-center text-lg text-gray-600 animate-pulse">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App