import React from 'react'
import { HiDownload } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { MdOutlineContactPage } from 'react-icons/md'
import { motion, scale } from 'motion/react'

function Card({data,reference}) {
  return (
    <motion.div drag dragConstraints={reference} whileDrag = {{scale:1.2}}className='relative h-80 flex-shrink-0 w-60 rounded-2xl bg-zinc-900/90 text-white shadow-lg shadow-black/50 overflow-hidden flex flex-col py-10 px-8'>
        <MdOutlineContactPage />
        <p className='text-xs mt-5 font-semibold leading-tight'>
            {data.description}
        </p>
        <footer className=' absolute footer bottom-0 w-full left-0 overflow-hidden rounded-b-2xl '>
            <div className='flex items-center justify-between mb-3 py-3 px-8'>
                <h5>{data.filesize}</h5>
                <span className='h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all duration-200 cursor-pointer'>
                    {data.close ? <IoClose className='h-4 w-4 text-zinc-400' /> : <HiDownload className='h-4 w-4 text-zinc-400' />}
                </span>
            </div>
            {data.tag.isOpen && (
                <div className={`tags w-full py-4 rounded-b-2xl flex items justify-center text-zinc-900 bg-${data.tag.tagColor}-600`}>
                <h3 className='text-sm font-semibold'>
                {data.state}
                </h3>
            </div>
            )}
            
        </footer>
    </motion.div>
  )
}

export default Card