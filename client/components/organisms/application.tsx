import React from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { UserFilesProps } from '@/interface';
import { StorageCalculation } from '@/utils/functions';
import ApplicationCard from '../atoms/application-card';

const Application = ({
  applicationFilter,
}: {
  applicationFilter: UserFilesProps[];
}) => {
  const sortedApplications: UserFilesProps[] = applicationFilter?.sort(
    (a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  );

  const storageUsed = StorageCalculation(applicationFilter);

  return (
    <main className='w-full p-5 flex flex-col items-center gap-5 bg-gray-200 overflow-y-scroll'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-col-7 justify-items-center gap-5'>
        {sortedApplications.map((file, index) => (
          <ApplicationCard key={index} file={file} />
        ))}
      </div>

      <p className='font-medium text-gray-400 text-sm'>
        {sortedApplications.length} Total item(s) | {storageUsed} Used
      </p>
    </main>
  );
};

export default Application;
