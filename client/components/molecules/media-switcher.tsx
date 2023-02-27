import React from 'react';
import { Audio, Image, Video } from '../index';

const MediaSwitcher = (props: any) => {
  console.log(props?.data);
  switch (props?.data?.file?.extension) {
    case 'png':
    case 'svg':
      return (
        <Image
          url={props?.data?.file?.url}
          alt={props?.data?.file?.originalFilename}
        />
      );

    case 'mp4':
    case 'swf':
    case 'mkv':
    case 'flv':
    case 'vob':
    case 'avi':
    case 'ogg':
    case 'mpeg':
    case 'rm':
    case '3gp':
    case 'm4v':
    case '3g2':
    case 'mov':
    case 'mpg':
    case 'asf':
    case 'wmv':
    case 'webm':
      return (
        <Video
          url={props?.data?.file?.url}
          extension={props?.data?.file?.extension}
        />
      );

    case 'mp3':
    case 'wma':
    case 'm4a':
      return (
        <Audio
          url={props?.data?.file?.url}
          extension={props?.data?.file?.extension}
        />
      );

    default:
      return <p>File Not supported yet.</p>;
  }
};

export default MediaSwitcher;
