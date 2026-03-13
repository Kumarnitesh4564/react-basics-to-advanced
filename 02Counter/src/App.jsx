import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter, setCounter]  = useState(15);

  // const addValue = () => {
  //   if(counter+3 <= 50) {
  //     setCounter(prevCounter => prevCounter + 1);
  //     setCounter(prevCounter => prevCounter + 1);
  //     setCounter(prevCounter => prevCounter + 1);
  //   }
  //   else setCounter(50);
  // }

  // const removeValue = () => {
  //   if(counter >= 3) {
  //     setCounter(prevCounter => prevCounter - 1);
  //     setCounter(prevCounter => prevCounter - 1);
  //     setCounter(prevCounter => prevCounter - 1);
  //   }
  //   else setCounter(0);
  // }

  const addValue = () => {
    setCounter(prev => Math.min(prev + 3, 50))
  }

  const removeValue = () => {
    setCounter(prev => Math.max(prev - 3, 0))
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
