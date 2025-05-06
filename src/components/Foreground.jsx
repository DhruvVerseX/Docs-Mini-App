import React from 'react'
import Card from './Card'
import { useRef } from 'react'



function Foreground() {
  const ref = useRef(null)
    const data = [
      {
        title: 'Neural Networks',
        description: 'Neural Networks are algorithms inspired by the human brain that are used to recognize patterns and solve complex problems.',
        filesize: '3.2 MB',
        close: false,
        tag: { isOpen: true, tagTitle: 'AI', tagColor: 'blue' },
        download: true,
        state: 'Download',
    },
    {
        title: 'Computer Vision',
        description: 'Computer Vision enables machines to interpret and make decisions based on visual data such as images and videos.',
        filesize: '4.1 MB',
        close: true,
        tag: { isOpen: true, tagTitle: 'Vision', tagColor: 'green' },
        download: false,
        state: 'Download',
    },
    {
        title: 'Natural Language Processing',
        description: 'NLP involves the interaction between computers and human language, allowing machines to understand and respond to text or voice data.',
        filesize: '5.0 MB',
        close: false,
        tag: { isOpen: false, tagTitle: 'NLP', tagColor: 'green' },
        download: true,
        state: 'Download',
    },
    {
        title: 'Reinforcement Learning',
        description: 'Reinforcement Learning is a type of machine learning where agents learn by interacting with an environment to maximize rewards.',
        filesize: '2.8 MB',
        close: true,
        tag: { isOpen: false, tagTitle: 'ML', tagColor: 'green' },
        download: true,
        state: 'Download',
    }
    ]
  return (
    <div ref ={ref}className='w-full h-full fixed z-[3] top-0 p-5 flex gap-5 flex-wrap left-0 '>
      {data.map((item, index) => (
        <Card data={item} reference = {ref}/>
      ))}
    </div>
  )
}

export default Foreground