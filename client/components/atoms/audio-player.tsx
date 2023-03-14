import React from 'react';
import * as jsmediatags from 'jsmediatags';
import { TagType } from 'jsmediatags/types';
import Image from 'next/image';
import { CgMusicNote } from 'react-icons/cg';
import { VscPlay, VscDebugPause } from 'react-icons/vsc';
import { Metadata } from '@/interface';




const AudioPlayer = ({ url }: { url: string }) => {
  const [metadata, setMetadata] = React.useState<Metadata>();
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}`);
      const data = await response.blob();
      console.log('data', data);

      jsmediatags.read(data, {
        onSuccess: (tags: { type: string; tags: any }) => {
          console.log('Tags', tags);
          console.log('Tags.Type', tags.type);
          setMetadata(tags.tags);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    };
    fetchData();
  }, [url]);

  React.useEffect(() => {
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    setAudio(audio);
  }, [url]);

  const togglePlay = () => {
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {metadata && metadata.picture && metadata.picture.data ? (
        <div className='w-64 h-64 bg-gray-100 rounded-md shadow-lg'>
          <Image
            src={`data:${metadata?.picture?.format};base64,${btoa(
              Array.from(metadata?.picture?.data)
                .map((byte) => String.fromCharCode(byte))
                .join('')
            )}`}
            className='w-auto h-auto rounded-md'
            width={1000}
            height={1000}
            alt=''
          />
        </div>
      ) : (
        <div className='w-64 h-64 flex justify-center items-center bg-gray-100 rounded-md shadow-lg mb-5'>
          <CgMusicNote className='text-[7rem]' />
        </div>
      )}

      {/* <audio controls controlsList='nodownload noremoteplayback'>
        <source src={url} type='audio/mpeg' />
      </audio> */}
      <p>Artist: {metadata && metadata.artist ? metadata.artist : ''}</p>
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? <VscDebugPause /> : <VscPlay />}
        </button>
        <span>{formatTime(currentTime)}</span> /{' '}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
