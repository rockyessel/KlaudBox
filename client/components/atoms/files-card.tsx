import React from 'react';
import FileExtensionSwitcher from '../molecules/file-extension-switcher';

const FilesCard = ({ file }: any) => {
  const TITLE_MAX = 25;

  console.log('file', file);

  const fileName =
    file.originalFilename?.length > TITLE_MAX
      ? `${file.originalFilename.slice(0, TITLE_MAX)}...`
      : file.originalFilename;
  return (
    <div className='relative my-1 flex flex-col'>
      <FileExtensionSwitcher
        extension={file.extension}
        class={`text-[7rem] w-full md:w-[12rem] h-full md:h-[12rem] flex justify-center items-center bg-gray-100 rounded-md shadow-lg mb-5 `}
      />
      <p className='text-sm text-center font-semibold'>{fileName}</p>
      <span className='absolute top-1 left-1 z-20'>
        <input title='checkbox' type='checkbox' className='checkbox' />
      </span>
    </div>
  );
};

export default FilesCard;
