import React from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion } from 'framer-motion';

const Navigation = ({ setPage, setgroup, page }) => {
  return (
    <div className='relative z-10'>

      {/* Pagination Buttons */}
      <div className='fixed bottom-5 left-5 flex items-center gap-x-2 text-2xl bg-yellow-500/50 rounded-full px-2 py-1 shadow-md'>
        {/* Previous Page Button */}
        <motion.button  initial={{scale:1}}
              whileHover={{scale:1.3}}
          onClick={() => page > 1 && setPage(prev => prev - 1)} 
          className={`cursor-pointer ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={page === 1}
        >
          <FaArrowLeft />
        </motion.button>

        <p className='text-xl select-none'>{page}</p>

        {/* Next Page Button */}
        <motion.button  initial={{scale:1}}
              whileHover={{scale:1.3}}
          onClick={() => setPage(prev => prev + 1)} 
          className='cursor-pointer'
        >
          <FaArrowRight />
        </motion.button>
      </div>

      {/* Category Selector */}
      <select 
        defaultValue='Popular' 
        onChange={(e) => {
          setgroup(e.target.value);
          setPage(1);
        }} 
        className='fixed top-5 left-5 bg-gray-200/90 text-sm tracking-wide text-gray-700 uppercase rounded-md outline-none p-1 cursor-pointer hover:bg-gray-200'
      >
        <option value='TopRated'>Top Rated</option>
        <option value='Popular'>Popular</option>
        <option value='UpComing'>Upcoming</option>
        <option value='Discover'>Discover</option>
      </select>

    </div>
  );
};

export default Navigation;
