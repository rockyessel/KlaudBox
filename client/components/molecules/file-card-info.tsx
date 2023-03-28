import React from 'react';
import TypeSwitcher from './file-extension-switcher';
import { downloadFile, formatFileSize, next_day } from '@/utils/functions';
import { format } from 'date-fns';
import { GuestFileProps } from '@/interface';
import { useGuestContext } from '@/context/guest-context';
import { AiFillCopy, AiOutlineCopy } from 'react-icons/ai';

const FileCardInfo = ({ data }: { data: GuestFileProps }) => {
  const { handleDeleteFile } = useGuestContext();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    if (isCopied !== true) {
      setIsCopied(true);
    }
  };
  return (
    <section className='w-full p-6 bg-white shadow-lg rounded-sm flex flex-col pb-10'>
      <div className='flex flex-wrap gap-16'>
        <div>
          <span className='text-xl font-bold'>
            {data?.file?.originalFilename}
          </span>
          <div>
            <TypeSwitcher
              class={` text-5xl sm:text-[15rem]`}
              extension={data?.file?.extension}
            />
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          <div className='flex flex-wrap gap-2 md:grid md:grid-cols-3 md:gap-5'>
            {/* <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Type</span>
              <span className='text-sm font-medium'>Google Docs</span>
            </div> */}
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Size</span>
              <span className='text-sm font-medium'>
                {formatFileSize(data?.file?.size)}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Owner ID</span>
              <span className='text-sm font-medium'>
                {data?.file?.identifier}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Date Uploaded</span>
              <span className='text-sm font-medium'>
                {format(new Date(data?.file?.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Deletion Date</span>
              <span className='text-sm font-medium'>
                {data?.file?.createdAt &&
                  format(
                    new Date(
                      next_day(
                        new Date(data?.file?.createdAt),
                        Number(data?.file?.delete_after)
                      )
                    ),
                    'MMM d, yyyy'
                  )}
              </span>
            </div>
            {/* <div className='flex flex-col gap-2'>
              <span className='text-lg'>Download Status</span>
              <span className='text-sm font-medium'>Available</span>
            </div> */}
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Privacy</span>
              <span className='text-sm font-medium'>
                {data?.file?.secure.toUpperCase()}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Extension</span>
              <span className='text-sm font-medium'>
                {data?.file?.extension}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Share link</span>
              <span
                onClick={() =>
                  handleCopy(
                    `https://klaudbox.vercel.app/guests/files/${data?.file?.cms_id}`
                  )
                }
                className='text-xl font-medium cursor-pointer'
              >
                {isCopied ? <AiFillCopy /> : <AiOutlineCopy />}
              </span>
            </div>
            {/* <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Source</span>
              <span className='text-sm font-medium'>Windows 11 Pro</span>
            </div> */}
          </div>

          <div className='flex flex-col gap-1'>
            <span>Title: {data?.file?.title}</span>
            <span className='max-w-lg'>
              Description: {data?.file?.description}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-5'>
        <button
          title='Download File'
          className='px-4 py-2 rounded-sm bg-blue-500'
          type={'button'}
          onClick={() => downloadFile(data?.file?.url, data?.file?.title)}
        >
          Download
        </button>
        <button
          type='button'
          onClick={() => handleDeleteFile(`${data?.file?.identifier}`)}
          className='px-4 py-2 rounded-sm bg-rose-500'
        >
          Delete File
        </button>
      </div>
    </section>
  );
};

export default FileCardInfo;
