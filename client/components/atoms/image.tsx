import React from 'react';
import NextImage from 'next/image';

const Image = ({ url, alt }: { url: string, alt: string }) => {
  return <NextImage src={url} alt={alt} width={1000} height={900} />;
};

export default Image;
