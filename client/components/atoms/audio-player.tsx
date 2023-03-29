import React from 'react';
import * as jsmediatags from 'jsmediatags';
import Image from 'next/image';
import { CgMusicNote } from 'react-icons/cg';
import { VscPlay, VscDebugPause } from 'react-icons/vsc';
import { Metadata, UserFilesProps } from '@/interface';

const AudioPlayer = ({ url }: { url: UserFilesProps }) => {
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url.url}`);
        const data = await response.blob();

        jsmediatags.read(data, {
          onSuccess: (tags: { type: string; tags: any }) => {
            setMetadata(tags.tags);
          },
          onError: (error) => {
            console.log(error);
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  React.useEffect(() => {
    const audio = new Audio(url.url);
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

  const TITLE_MAX = 25;

  const fileName = metadata?.title?.length
    ? metadata?.title?.length > TITLE_MAX
      ? `${metadata?.title?.slice(0, TITLE_MAX)}...`
      : metadata?.title
    : url.originalFilename?.length > TITLE_MAX
    ? `${url.originalFilename.slice(0, TITLE_MAX)}...`
    : url.originalFilename;

  return (
    <div className='flex flex-col justify-self-stretch'>
      {metadata && metadata.picture && metadata.picture.data ? (
        <div className='w-full md:w-[12rem] h-full md:h-[12rem] bg-gray-100 rounded-sm shadow-lg relative my-1'>
          <Image
            src={`data:${metadata?.picture?.format};base64,${btoa(
              Array.from(metadata?.picture?.data)
                .map((byte) => String.fromCharCode(byte))
                .join('')
            )}`}
            className='w-full h-full rounded-sm object-cover object-center'
            width={1000}
            height={1000}
            alt={
              metadata && metadata.title ? metadata.title : url.originalFilename
            }
          />
          <span className='absolute top-1 left-1 z-20'>
            <input title='checkbox' type='checkbox' className='checkbox' />
          </span>
        </div>
      ) : (
        <div className='w-full md:w-[12rem] h-full md:h-[12rem] flex justify-center items-center bg-gray-100 rounded-sm shadow-lg mb-5 relative my-1'>
          <CgMusicNote className='text-[7rem]' />
          <span className='absolute top-1 left-1 z-20'>
            <input title='checkbox' type='checkbox' className='checkbox' />
          </span>
        </div>
      )}

      <p className='font-medium text-sm'>{fileName}</p>
      <div>
        <button title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
          {isPlaying ? <VscDebugPause /> : <VscPlay />}
        </button>
        <span>{formatTime(currentTime)}</span> /{' '}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
