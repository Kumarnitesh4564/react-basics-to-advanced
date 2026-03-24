import { useState } from 'react'

import './App.css'

import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
function App() {
  

  return (
    <>
      <div className="flex justify-center">
      <h1 className="text-2xl font-bold mt-6 bg-orange-500 px-4 py-2 rounded">
        Learn About Redux Toolkit
      </h1>
    </div>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
