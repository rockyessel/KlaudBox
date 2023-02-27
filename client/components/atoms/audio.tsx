import React from 'react';

const Audio = ({ url, extension }: { url: string; extension: string }) => {
  return (
    <audio controls autoPlay>
      <source src={url} type={`audio/${extension}`} />
    </audio>
  );
};

export default Audio;
