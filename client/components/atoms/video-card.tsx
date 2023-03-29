import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';

const VideoCard = ({ video }: any) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
    }
  }, []);

  const TITLE_MAX = 25;

  const fileName =
    video.originalFilename?.length > TITLE_MAX
      ? `${video.originalFilename.slice(0, TITLE_MAX)}...`
      : video.originalFilename;

  return (
    <div className='w-full md:w-[12rem] h-full md:h-[12rem] rounded-sm flex flex-col items-center justify-center relative'>
      <video
        width={1000}
        height={1000}
        controls={isPlaying}
        ref={videoRef}
        className='rounded-sm'
      >
        <source src={video?.url} type={video?.mimeType} />;
      </video>
      <p>{fileName}</p>
      {!isPlaying && (
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
          <BsPlayCircle
            onClick={() => videoRef.current?.play()}
            className='text-white text-5xl'
          />
        </span>
      )}
    </div>
  );
};

export default VideoCard;
