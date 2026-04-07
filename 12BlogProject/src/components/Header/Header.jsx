import React from 'react'
import {Logo, LogoutBtn, Container} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-xl sticky top-0 z-50 border-b border-blue-500/20">
      <Container>
        <nav className="flex items-center justify-between py-3 px-4">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-90 transition-all duration-200 group">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 group-hover:bg-white/20 transition-colors">
                <Logo width="32px" />
              </div>
              <span className="ml-3 text-white font-bold text-lg tracking-wide hidden sm:block">
                Blog
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <ul className="flex items-center gap-2 md:gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white font-medium hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 text-sm md:text-base backdrop-blur-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:scale-105 text-sm md:text-base ml-2" />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header