import React from 'react';
import TypeSwitcher from './media-type-switcher';
import { formatFileSize, next_day } from '@/utils/functions';
import { format } from 'date-fns';
import { GuestFileProps } from '@/interface';
import { useGuestContext } from '@/context/GuestContext';

const FileCardInfo = ({ data }: { data: GuestFileProps }) => {
  const { handleDeleteFile } = useGuestContext();
  return (
    <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex flex-col'>
      <div className='flex gap-16'>
        <div>
          <span className='text-xl font-bold'>
            {data?.file?.originalFilename}
          </span>
          <div>
            <TypeSwitcher
              class={`text-[15rem]`}
              extension={data?.file?.extension}
            />
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          <div className='grid grid-cols-6 gap-5'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Type</span>
              <span className='text-gray-300 text-sm font-medium'>
                Google Docs
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Size</span>
              <span className='text-gray-300 text-sm font-medium'>
                {formatFileSize(data?.file?.size)}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Owner ID</span>
              <span className='text-gray-300 text-sm font-medium'>
                {data?.file?.identifier}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Date Uploaded</span>
              <span className='text-gray-300 text-sm font-medium'>
                {format(new Date(data?.file?.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Deletion Date</span>
              <span className='text-gray-300 text-sm font-medium'>
                {format(
                  new Date(
                    next_day(
                      new Date(data?.file?.createdAt),
                      Number(data?.file?.delete_after)
                    )
                  ),
                  'MMM d, yyyy'
                )}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Download Status</span>
              <span className='text-gray-300 text-sm font-medium'>
                Available
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Privacy</span>
              <span className='text-gray-300 text-sm font-medium'>
                {data?.file?.secure}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Extension</span>
              <span className='text-gray-300 text-sm font-medium'>
                {data?.file?.extension}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Share link</span>
              <span className='text-gray-300 text-sm font-medium'>mp4</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Source</span>
              <span className='text-gray-300 text-sm font-medium'>
                Windows 11 Pro
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <span>Title: {data?.file?.title}</span>
            <span className='max-w-lg'>
              Description: {data?.file?.description}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <a
          title='Download File'
          className='px-4 py-2 rounded-lg bg-blue-500'
          href={data?.file?.url}
          download={data?.file?.url}
        >
          Download
        </a>
        <button
          type='button'
          onClick={() => handleDeleteFile(`${data?.file?.identifier}`)}
          className='px-4 py-2 rounded-lg bg-rose-500'
        >
          Delete File
        </button>
      </div>
    </section>
  );
};

export default FileCardInfo;
