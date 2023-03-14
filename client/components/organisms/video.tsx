import { UserFilesProps } from '@/interface';
import React from 'react';

const VideoType = ({ videoFilter }: { videoFilter: UserFilesProps[] }) => {
    const sortedVideo: UserFilesProps[] = videoFilter?.sort(
      (a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    );
  return (
    <main className='w-full p-5 flex flex-col gap-5'>
      {sortedVideo?.map((video, index) => (
        <div
          key={index}
          className='relative w-[15rem] bg-gray-100 rounded-md flex items-center justify-center'
        >
          <video width={250} height={300} controls={false}>
            <source src={video?.url} type={video?.mimeType} />
          </video>
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              title='play button'
              type='button'
              className='text-white rounded-full bg-gray-500 p-4'
            >
              <svg
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default VideoType;
