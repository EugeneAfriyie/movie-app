import React, { useState } from 'react'
import { motion } from 'framer-motion'
const Card = ({cardWidth,movie}) => {

    const [showDesc, setShowDesc] = useState(false)

    const [genres,releaseDate,originalLanguage,overview,title,image] = movie
  return (
    <div className='h-[650px] relative flex justify-center items-center  p-2 backdrop-blur-2xl '>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:showDesc ? 1 : 0}}
        transition={{duration: .2}}
        onClick={() => setShowDesc(!showDesc)} style={{width:cardWidth}} className='w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/50 flex flex-col justify-center gap-y-2 p-10 cursor-pointer '>
            <h1 className=' text-4xl '>{title}</h1>
            <div className='flex gap-x-2 items-center'>
                <span className='text-lg '>Genres</span>
                <span className='font-semibold text-red-600'>{genres.map((genre) => (
                    genre
                ))}</span>
            </div>
            <span className='flex gap-x-2 '>Original Language: <span className='mr-2 uppercase'>{originalLanguage}</span></span>
            <span className='flex gap-x-2' >Released Date:<span className='mr-2 text-yellow-400' >{releaseDate}</span></span>
            <p className='flex flex-col gap-y-1 '>
                <span className='text-red-500  '>Summary</span>
                <span className='first-letter:pl-2 '>{overview}</span>
            </p>
        </motion.div>

        <img src={image}
             alt="Movie image"
             className='object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 absolute w-[97%] h-[97%] '
             />
    </div>
  )
}

export default Card