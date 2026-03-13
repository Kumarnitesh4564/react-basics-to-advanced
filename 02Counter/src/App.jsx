import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter, setCounter]  = useState(15);

  const addValue = () => {
    if(counter <= 49) setCounter(counter + 1);
  }

  const removeValue = () => {
    if(counter >= 1) setCounter(counter - 1);
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter Value: {counter}</h2>
      <button
      onClick={addValue}
      >Add value</button> 
      <br />
      <button
      onClick={removeValue}
      >remove value</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App
