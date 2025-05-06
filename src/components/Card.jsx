import React from 'react'
import { HiDownload } from 'react-icons/hi'
import { MdOutlineContactPage } from 'react-icons/md'

function Card() {
  return (
    <div className='relative h-80 w-60 rounded-2xl bg-zinc-900/90 text-white shadow-lg shadow-black/50 overflow-hidden flex flex-col py-10 px-8'>
        <MdOutlineContactPage />
        <p className='text-xs mt-5 font-semibold leading-tight'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, 
            reiciendis? Quod, voluptatibus! Quisquam, voluptatibus.
        </p>
        <footer className=' absolute footer bottom-0 w-full left-0 overflow-hidden rounded-b-2xl '>
            <div className='flex items-center justify-between mb-3 py-3 px-8'>
                <h5>.4mb</h5>
                <span className='h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all duration-200 cursor-pointer'>
                    <HiDownload className='h-4 w-4 text-zinc-400' />
                </span>
            </div>
            <div className='tags w-full py-4 rounded-b-2xl flex items justify-center text-zinc-900 bg-green-600'>
                <h3 className='text-sm font-semibold'>
                Download Now
                </h3>
            </div>
        </footer>
    </div>
  )
}

export default Card