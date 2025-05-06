import React from 'react'
import Card from './Card'


function Foreground() {
    const data = [
        {
            title: 'Title',
            description: 'Digital Image Processing or DIP is software that takes a digital image as an input to process it to get an image as an output. In other words, DIP deals with the manipulation of digital images by using a digital computer. It is a subcategory of signals and systems where it can be easily understood by beginners if they know the basics of digital electronics',
            filesize: '2.5 MB',
            close: true,
            tag: {isOpen: true, tagTile: 'Tag' ,tagColor: 'bg-red-500'},
            download: true,
        }
    ]
  return (
    <div className='w-full h-full fixed z-[3] top-0 left-0 '>
      {data.map((item, index) => (
        <Card/>
      ))}
    </div>
  )
}

export default Foreground