import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        if(!input.trim()) return
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={addTodoHandler} className="flex gap-3 mt-8">
        
        <input
          type="text"
          className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-gray-100 px-4 py-2 rounded-lg outline-none transition duration-200"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
        >
          Add
        </button>

      </form>
    </div>
  )
}

export default AddTodo