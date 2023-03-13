import React from 'react';
import { Folder, UserTable } from '../index';
import Image from 'next/image';

const Picture = ({ imageFilter }: any) => {
  
    const sortedImages = imageFilter?.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    console.log('sortedImages', sortedImages);
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
        {sortedImages?.map((image, index) => (
          <div key={index}>
            <div className='w-[15rem] h-[15rem]'>
              <Image
                src={image?.url}
                className='w-full h-full object-cover object-center'
                width={400}
                height={300}
                alt=''
              />
            </div>
            {/* <p className='text-sm'>{image.originalFilename}</p> */}
            <p className='text-sm'>{image.identifier}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Picture;
