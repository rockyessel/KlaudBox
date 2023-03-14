import React from 'react';
import AudioPlayer from '../atoms/audio-player';
import { UserFilesProps } from '@/interface';

const Music = ({ audioFilter }: {audioFilter: UserFilesProps[]}) => {
  const sortedAudio: UserFilesProps[] = audioFilter?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <main className='w-full p-5 flex flex-wrap gap-5'>
      {sortedAudio.map((audio, index) => (
        <AudioPlayer key={index} url={audio.url} />
      ))}
    </main>
  );
};

export default Music;
