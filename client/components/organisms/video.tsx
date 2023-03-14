import React from 'react';
import {Folder, UserTable} from '../index';

const VideoType = ({ videoFilter }:any) => {
  return (
    <main className='w-full p-5 flex flex-col gap-5'>
      <section className='flex items-center gap-2'>
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
      </section>
      <section className='flex items-center gap-2'>
        <UserTable />
      </section>
    </main>
  );
};

export default VideoType;
