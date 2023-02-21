import React from 'react';
import { BsImage } from 'react-icons/bs';
import TypeSwitcher from '../molecules/media-type-switcher';
import moment from 'moment';

const Tiles = ({ guestData }: any) => {
  return (
    <ul className='flex flex-wrap'>
      {guestData?.map((data: any, index: number) => (
        <li
          key={index}
          className='flex flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'
        >
          <TypeSwitcher
            class={`text-[5rem] text-gray-300`}
            extension={`${data?.extension}`}
          />

          <div className='text-center'>
            <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
              {data?.originalFilename?.slice(0, 26)}
            </p>
            <p className='text-[0.8rem]'>{data?.createdAt}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Tiles;
