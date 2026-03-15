import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numAllowed) str += "0123456789";

    if(charAllowed) str += "`~!@#$%^&*()-_=+{}{[]"

    for(let i=1; i <= length; i++) {
      let charInd = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charInd);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);

    setCopied(true)

    setTimeout(() => {
      setCopied(false);
      passwordRef.current?.blur();
      window.getSelection()?.removeAllRanges();
    },1500)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} 
        />

        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-3 py-0.5 shrink-0 text-white transition-all duration-200 
          ${copied ? "bg-green-600 scale-95" : "bg-blue-700 hover:bg-blue-800 active:scale-95"}`}
        >
        {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label htmlFor="">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">NUmbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
