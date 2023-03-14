import React from 'react';
import { Folder, UserTable } from '../index';
import AudioPlayer from '../atoms/audio-player';

const Music = ({ audioFilter }: any) => {

  console.log('audioFilter', audioFilter);
  return (
    <main className='w-full p-5 flex flex-wrap gap-5'>
      {audioFilter.map((audio, index) => (
        <AudioPlayer key={index} url={audio.url} />
      ))}
    </main>
  );
};

export default Music;
