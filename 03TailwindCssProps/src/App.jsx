import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-2">

      <h1 className="bg-green-500 text-black text-4xl font-bold px-6 py-3 rounded-xl">
        Tailwind Test
      </h1>

      <Card/>
      <Card btnText='Read More'/>

    </div>
  )
}

export default App
