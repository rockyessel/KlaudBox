import React from 'react';
import { Audio, Image, Video } from '../index';

const MediaSwitcher = (props: any) => {
  console.log(props?.data);
  switch (props?.data?.file?.extension) {
    case 'png':
    case 'svg':
    case 'bmp':
    case 'gif':
    case 'jpeg':
    case 'jpg':
    case 'psd':
    case 'tiff':
    case 'tif':
    case 'webp':
    case 'ico':
    case 'cdr':
    case 'ai':
    case 'eps':
    case 'jfif':
    case 'jp2':
    case 'jpx':
    case 'pbm':
    case 'pgm':
    case 'ppm':
    case 'raw':
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
    case 'aac':
    case 'aif':
    case 'aiff':
    case 'flac':
    case 'ogg':
    case 'opus':
    case 'wav':
    case 'wma':
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
