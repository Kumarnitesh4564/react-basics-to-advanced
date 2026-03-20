import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const {userId} = useParams()
  return (
    <div className='bg-gray-500 text-center text-white text-3xl p-3'>User: {userId}</div>
  )
}
