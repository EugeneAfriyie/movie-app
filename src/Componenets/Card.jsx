import React from 'react'

const Card = ({cardWidth}) => {
  return (
    <div style={{width:cardWidth}} className='h-[650px] relative flex justify-center items-center shrink-0 p-2 bg-gray-600 group '>
        <div className='w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/50 flex flex-col justify-center gap-y-2 p-10 cursor-pointer '>
            <h1 className=' text-4xl '>The Godfather</h1>
            <div className='flex gap-x-2 items-center'>
                <span className='text-lg '>Genres</span>
                <span className='font-semibold text-red-600'>Crime Drama</span>
            </div>
            <span className='flex gap-x-2 '>Original Language: <span className='mr-2 uppercase'>En</span></span>
            <span className='flex gap-x-2' >Released Date:<span className='mr-2 text-yellow-400' >1792-03-36</span></span>
            <p className='flex flex-col gap-y-1 '>
                <span className='text-red-500  '>Summary</span>
                <span className='first-letter:pl-2 '>Summary text</span>
            </p>
        </div>

        <img src="/download.jpg"
             alt="Movie image"
             className='object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 absolute w-[97%] h-[97%] '
             />
    </div>
  )
}

export default Card