import React from 'react'
import Background from './components/Backgrond'
import Navbar from './components/Navbar'
import Foreground from './components/Foreground'

function App() {

  return (
   <div className=' relative w-full h-screen bg-zinc-800'>
    <Navbar/>
    <Background/>
    <Foreground/>
   </div>
  )
}

export default App
