import React from 'react';
import Image from 'next/image';
import { UserFilesProps } from '@/interface';
import { StorageCalculation } from '@/utils/functions';
import ImageCard from '../atoms/image-card';

const Picture = ({ imageFilter }: { imageFilter: UserFilesProps[] }) => {
  const sortedImages: UserFilesProps[] = imageFilter?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const storageUsed = StorageCalculation(sortedImages);
  return (
    <main className='w-full p-5 flex flex-col items-center gap-5 bg-gray-200 overflow-y-scroll'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-col-7 justify-items-center gap-x-0 gap-y-0'>
        {sortedImages?.map((image, index) => (
          <ImageCard key={index} image={image} />
        ))}
      </div>

      <p className='font-medium text-gray-400 text-sm'>
        {sortedImages.length} Total item(s) | {storageUsed} Used
      </p>
    </main>
  );
};

export default Picture;
