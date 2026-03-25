import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const [editId, setEditId] = useState(null) 
    const [editMsg, setEditMsg] = useState("")

    const handleEdit = (todo) => {
      setEditId(todo.id)
      setEditMsg(todo.text)
    }

    const handleSave = (id) => {
      if(!editMsg.trim()) return
      dispatch(updateTodo({id, text: editMsg}))
      setEditId(null)
    }


  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Your Todos</h2>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gradient-to-r from-zinc-800 to-zinc-900 px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            
            {/* 🔹 TEXT / INPUT (you control toggle later) */}
            <div className="flex-1 mr-3">
              {editId === todo.id ? (
                <input
                  type="text"
                  className="w-full bg-zinc-700 text-white px-3 py-1 rounded outline-none"
                  value={editMsg}
                  onChange={(e) => setEditMsg(e.target.value)}
                />
              ) : (
                <span className="text-white text-md">
                  {todo.text}
                </span>
              )}
            </div>

            {/* 🔹 BUTTONS */}
            <div className="flex gap-2">

              {/* ✏️ Edit / Save */}
              {editId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                >
                  Edit
                </button>
              )}

              {/* ❌ Delete */}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
              >
                Delete
              </button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos