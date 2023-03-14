import React from 'react';
import Image from 'next/image';
import { UserFilesProps } from '@/interface';
import { StorageCalculation } from '@/utils/functions';

const Picture = ({ imageFilter }: { imageFilter: UserFilesProps[] }) => {
  const sortedImages: UserFilesProps[] = imageFilter?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const storageUsed = StorageCalculation(sortedImages);
  return (
    <main className='w-full p-5 flex flex-col items-center gap-5 bg-gray-200 overflow-y-scroll'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-col-7 justify-items-center gap-x-0 gap-y-0'>
        {sortedImages?.map((image, index) => (
          <div key={index} className='relative my-1'>
            <div className=' w-full sm:w-[12rem] h-[12rem] flex flex-col'>
              <Image
                src={image?.url}
                className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
                width={400}
                height={300}
                priority
                blurDataURL={image?.url}
                alt={image?.originalFilename}
              />
              <p className='text-sm text-center font-semibold'>
                {image.originalFilename.slice(0, 10)}
              </p>
            </div>
            <span className='absolute top-1 left-1'>
              <input title='checkbox' type='checkbox' className='checkbox' />
            </span>
          </div>
        ))}
      </div>

      <p className='font-medium text-gray-400 text-sm'>
        {sortedImages.length} Total item(s) | {storageUsed} Used
      </p>
    </main>
  );
};

export default Picture;
