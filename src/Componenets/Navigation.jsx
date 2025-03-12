import React from 'react'
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";


const Navigation = ({setPage,setGroup,page}) => {
  return (
    <div className='relative z-10'>
      <div className='fixed bottom-5 left-5 flex items-center gap-x-2 text-2xl bg-yellow-500/50 rounded-full px-2'>
        <span onClick={()=> page != 1 && setPage(page => page - 1)} className='cursor-pointer'><FaArrowLeft />  </span>
        <p className='text-xl select-none'>{page}</p>
        <span onClick={()=> setPage(page => page + 1)} className='cursor-pointer'><FaArrowRight /> </span>
      </div>
      
      <select name='' className='fixed top-5 left-5 bg-gray-200/90 text-sm tracking-wide text-gray-700 uppercase rounded-md outline-none p-1 cursor-pointer hover:bg-gray-200 '>
        <option value='TopRated'>TopRated</option>
        <option value='Popular'>Popular</option>
        <option value='Upcoming'>Upcoming</option>
        <option value='Discover'>Discover</option>
      </select>
    </div>
  )
}

export default Navigation