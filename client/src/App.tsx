import { useState } from 'react'
import './App.css'

function App() {
  const [yesh, setYesh] = useState("Hello world.");

  return (
    <>
      <h1>{yesh}</h1>

      <button onClick={() => { setYesh("Hello coders!") }}>I do programming btw</button>
    </>
  )
}

export default App
