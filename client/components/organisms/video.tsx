import { UserFilesProps } from '@/interface';
import React from 'react';
import VideoCard from '../atoms/video-card';

const VideoType = ({ videoFilter }: { videoFilter: UserFilesProps[] }) => {
  const sortedVideo: UserFilesProps[] = videoFilter?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });


  return (
    <main className='w-full p-5 flex flex-col items-center gap-5 bg-gray-200 overflow-y-scroll'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-col-7 justify-items-center gap-5'>
        {sortedVideo?.map((video, index) => (
          <VideoCard video={video} key={index} />
        ))}
      </div>
    </main>
  );
};

export default VideoType;
