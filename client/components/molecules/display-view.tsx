import React from 'react';
import { useRouter } from 'next/router';
import { Application, Favorites, Picture, Recent, VideoType, Music } from '../index';

const DisplayView = () => {
  const { section } = useRouter().query;

  switch (section) {
    case 'recent':
      return <Recent />;
    case 'favorites':
      return <Favorites />;
    case 'picture':
      return <Picture />;
    case 'video':
      return <VideoType />;
    case 'music':
      return < Music/>;
    case 'application':
      return <Application />;
    case 'files':
      return <>files</>;
    case 'google-drive':
      return <>google-drive</>;
    case 'one-drive':

    default:
      return <h1>404 page</h1>;
  }
};

export default DisplayView;
