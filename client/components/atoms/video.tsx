import React from 'react';

const Video = ({ url, extension }: { url: string; extension: string }) => {
  return (
    <video width={1000} height={1000} controls autoPlay>
      <source src={url} type={`video/${extension}`} />
    </video>
  );
};

export default Video;
