import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Your Todos</h2>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gradient-to-r from-zinc-800 to-zinc-900 px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <div className='text-white text-md'>{todo.text}</div>

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos