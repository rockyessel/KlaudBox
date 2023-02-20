import React from 'react';
import { BsImage } from 'react-icons/bs';
import TypeSwitcher from '../molecules/media-type-switcher';

const Tiles = () => {
  return (
    <ul className='flex flex-wrap'>
      <li className='flex flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'>
        <TypeSwitcher class={`text-[5rem] text-gray-300`} extension={`png`} />

        <div className='text-center'>
          <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
            Nicepage-5.4.4.exe
          </p>
          <p className='text-[0.8rem]'>Nov 30,2021</p>
        </div>
      </li>
      <li className='flex flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'>
        <TypeSwitcher class={`text-[5rem] text-gray-300`} extension={`doc`} />

        <div className='text-center'>
          <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
            Nicepage-5.4.4.exe
          </p>
          <p className='text-[0.8rem]'>Nov 30,2021</p>
        </div>
      </li>
      <li className='flex flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'>
        <TypeSwitcher class={`text-[5rem] text-gray-300`} extension={`mp3`} />

        <div className='text-center'>
          <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
            Nicepage-5.4.4.exe
          </p>
          <p className='text-[0.8rem]'>Nov 30,2021</p>
        </div>
      </li>
      <li className='flex flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'>
        <TypeSwitcher class={`text-[5rem] text-gray-300`} extension={`mp4`} />

        <div className='text-center'>
          <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
            Nicepage-5.4.4.exe
          </p>
          <p className='text-[0.8rem]'>Nov 30,2021</p>
        </div>
      </li>
    </ul>
  );
};

export default Tiles;
