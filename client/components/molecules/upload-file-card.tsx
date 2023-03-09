import React from 'react';
import TypeSwitcher from './media-type-switcher';
import { formatFileSize } from '@/utils/functions';

const UploadFileCard = (props: any) => {
  const extension = props?.file?.name?.split('.').pop();
  return (
    <li className='rounded-lg p-2 border-[1px] border-gray-500/50'>
      <div className='flex items-center gap-2'>
        <div className='border-[1px] border-gray-500/50 rounded-md p-1'>
          <TypeSwitcher class='text-2xl' extension={extension} />
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
