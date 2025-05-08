import React, { useState } from "react";
import { HiDownload } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { MdOutlineTask, MdCheckCircle, MdRadioButtonUnchecked, MdPushPin } from 'react-icons/md'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'

function Card({data, reference, onDelete, onToggleComplete, onStack, onUnstack, isStacked}) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for drag
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform values for rotation and scale
  const rotate = useTransform(springX, [-200, 200], [-10, 10]);
  const scale = useTransform(springY, [-200, 200], [0.95, 1.05]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const { x, y } = info.point;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Check if card is dragged outside the screen
    if (x < -100 || x > windowWidth + 100 || y < -100 || y > windowHeight + 100) {
      // Animate out before deleting
      const card = event.target;
      card.style.transition = "all 0.3s ease-out";
      card.style.transform = `translate(${x > windowWidth/2 ? windowWidth : -windowWidth}px, ${y}px) rotate(${x > windowWidth/2 ? 45 : -45}deg)`;
      card.style.opacity = "0";
      
      setTimeout(() => {
        onDelete(data.id);
      }, 300);
    } else {
      // Reset position with spring animation
      springX.set(0);
      springY.set(0);
    }
  };

  const handleStackToggle = (e) => {
    e.stopPropagation();
    if (isStacked) {
      onUnstack(data.id);
    } else {
      onStack(data.id);
    }
  };

  return (
    <motion.div
      drag={!isStacked}
      dragConstraints={reference}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        x: springX,
        y: springY,
        rotate,
        scale: isDragging ? 1.05 : scale,
        zIndex: isDragging ? 50 : 1
      }}
      className={`relative h-52 flex-shrink-0 w-80 glass hover-glow overflow-hidden flex flex-col py-6 px-6 group ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${isStacked ? "stacked" : ""}`}
    >
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-purple-400'>
                <MdOutlineTask className='h-6 w-6' />
                <h2 className='text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text'>
                    {data.title}
                </h2>
            </div>
            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleStackToggle}
                    className={`text-2xl transition-colors ${
                        isStacked ? "text-purple-400" : "text-zinc-400 hover:text-purple-400"
                    }`}
                >
                    <MdPushPin />
                </motion.button>
                <button
                    onClick={() => onToggleComplete(data.id)}
                    className='text-2xl text-purple-400 hover:text-purple-300 transition-colors'
                >
                    {data.completed ? (
                        <MdCheckCircle className='text-green-400' />
                    ) : (
                        <MdRadioButtonUnchecked />
                    )}
                </button>
            </div>
        </div>
        <p className='text-sm mt-3 font-medium leading-tight text-zinc-300 line-clamp-2'>
            {data.description}
        </p>
        <div className='mt-auto'>
            <div className='flex items-center gap-2 mb-2'>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data.completed 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-purple-500/20 text-purple-400"
                }`}>
                    {data.folder}
                </span>
                <span className='text-sm text-zinc-400'>
                    Due: {new Date(data.dueDate).toLocaleDateString()}
                </span>
            </div>
        </div>
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(data.id)}
            className='absolute top-2 right-2 h-8 w-8 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center hover:bg-purple-500/30 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100'
        >
            <IoClose className='h-4 w-4 text-purple-400' />
        </motion.button>

        {/* Drag Handle */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-purple-500/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-500/10 to-transparent" />
        </div>
    </motion.div>
  )
}

export default Card