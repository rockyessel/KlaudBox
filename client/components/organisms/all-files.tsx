import React from 'react';
import UserExtension from '../molecules/user-extension';
import { UserFilesProps } from '@/interface';
import { StorageCalculation } from '@/utils/functions';

const AllFiles = ({ files }: { files: UserFilesProps[] }) => {
  const storageUsed = StorageCalculation(files);
  

  return (
    <main className='w-full p-5 flex flex-col items-center gap-5 bg-gray-200 overflow-y-scroll'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-col-7 justify-items-center gap-x-0 gap-y-0'>
        {files.map((file, index) => (
          <UserExtension key={index} file={file} />
        ))}
      </div>

      <p className='font-medium text-gray-400 text-sm'>
        {files.length} Total item(s) | {storageUsed} Used
      </p>
    </main>
  );
};

export default AllFiles;
