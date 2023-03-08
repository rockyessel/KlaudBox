import React from 'react'
import { RiMore2Fill } from 'react-icons/ri';
import { RxImage } from 'react-icons/rx';

const FileType = (props:any) => {
  return (
    <div className='rounded-md bg-gray-50 px-4 py-3 flex items-center gap-16 shadow-lg'>
      <p className='inline-flex items-center gap-2'>
        <RxImage className='text-xl' /> <span>{props.name}</span>
      </p>
      <span>
        <RiMore2Fill className='text-xl' />
      </span>
    </div>
  );
}

export default FileType