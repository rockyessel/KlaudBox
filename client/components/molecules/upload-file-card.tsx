import React from 'react';
import FileExtensionSwitcher from './file-extension-switcher';
import { formatFileSize } from '@/utils/functions';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

const UploadFileCard = (props: any) => {
  const extension = props?.file?.name?.split('.').pop();

  return (
    <li
      onClick={() => props.handleRemoveFile(props?.file?.name)}
      className='rounded-lg p-2 border-[1px] border-gray-500/50 transition ease-in-out delay-150'
    >
      <button
        type={`button`}
        title={`Remove ${props?.file?.name}`}
        className='inline-flex justify-end w-full'
      >
        <IoIosRemoveCircleOutline className='text-xl text-red-700' />
      </button>
      <div className='flex items-center gap-2'>
        <div className='border-[1px] border-gray-500/50 rounded-md p-1'>
          <FileExtensionSwitcher class='text-2xl' extension={extension} />
        </div>

        <div className=' w-full flex justify-center flex-col'>
          <div className='w-full flex items-center justify-between'>
            <span className='font-bold'>
              {props?.file?.name}{' '}
              <span>({formatFileSize(props?.file?.size)})</span>
            </span>
            <p className='text-xs font-semibold inline-block h-2 text-rose-600 text-right'>
              {props?.progress}%
            </p>
          </div>

          <div className='w-full overflow-hidden flex h-2 mb-4 text-xs rounded bg-rose-200'>
            <div
              style={{ width: `${props.progress}%` }}
              className='bg-pink-500 rounded-r'
            ></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UploadFileCard;
