import React from 'react';
import { Folder, UserTable } from '../index';
import Image from 'next/image';

const Picture = ({ imageFilter }: any) => {
  console.log('imageFilter', imageFilter);
  return (
    <main className='w-full p-5 flex flex-col gap-5'>
      {/* <section className='flex items-center gap-2'>
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
      </section> */}

      <div className='w-full flex flex-wrap gap-2'>
        {imageFilter?.map((image, index) => (
          <div key={index} className='w-[15rem]'>
            <div className=''>
              <Image src={image?.url} width={400} height={300} alt='' />
            </div>
            <p className='text-sm'>{image.originalFilename}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Picture;
