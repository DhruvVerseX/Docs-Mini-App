import React from 'react'


function Backgrond() {
  return (
    <div className='fixed w-full z-2 h-screen'>
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <h1 className="text-[10vw] leading-none tracking-tight font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text animate-pulse">
          DOCS.
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-purple-400/20 blur-3xl -z-10 animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
    </div>
  )
}

export default Backgrond