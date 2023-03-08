import React from 'react';
import { FcFolder } from 'react-icons/fc';
import { RiMore2Fill } from 'react-icons/ri';

const Folder = () => {
  return (
    <div className='rounded-lg bg-gray-50 shadow-md px-4 py-2'>
      <span className='flex items-center justify-between'>
        <FcFolder className='text-7xl' />
        <RiMore2Fill className='text-xl' />
      </span>
      <p>Front-end</p>
      <p className='flex items-center gap-16'>
        <span className='text-gray-400'>32 files</span>
        <span className='text-gray-400'>324 GB</span>
      </p>
    </div>
  );
};

export default Folder;
