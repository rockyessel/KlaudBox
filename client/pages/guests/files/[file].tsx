import React from 'react';
import { singleGuestFile } from '@/utils/api-request';
import { Main, TypeSwitcher } from '@/components';
import { AiOutlineBarcode } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs';
import Image from 'next/image';

const FileDetails = () => {
  const [allFiles, setAllFiles] = React.useState<any>({});
  const [downloadState, setDownloadState] = React.useState(true);
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [code, setCode] = React.useState('');
  console.log(allFiles);

  console.log(checkboxState);

  const memoizedAllFiles = React.useMemo(() => allFiles, [allFiles]);

  React.useEffect(() => {
    if (code) {
      singleGuestFile(code).then((data) => setAllFiles(data));
    }
  }, [code]);

  React.useEffect(() => {
    if (memoizedAllFiles?.success === true) {
      setDownloadState(true);
    } else {
      setDownloadState(false);
    }
  }, [memoizedAllFiles]);

  return (
    <Main class={` ${checkboxState ? 'h-full' : 'h-screen'}`}>
      <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex gap-16'>
        <div>
          <span className='text-xl font-bold'>Loads-of-the-rings.mp4</span>
          <div>
            <TypeSwitcher class={`text-[15rem]`} extension={`png`} />
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          <div className='grid grid-cols-6 gap-5'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Type</span>
              <span className='text-gray-300 text-sm font-medium'>
                Google Docs
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Size</span>
              <span className='text-gray-300 text-sm font-medium'>34.3GB</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Owner ID</span>
              <span className='text-gray-300 text-sm font-medium'>JSDJ2</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Date Uploaded</span>
              <span className='text-gray-300 text-sm font-medium'>
                Dec 9, 2022
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Deletion Date</span>
              <span className='text-gray-300 text-sm font-medium'>
                Dec 10, 2022
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Download</span>
              <span className='text-gray-300 text-sm font-medium'>Here</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Privacy</span>
              <span className='text-gray-300 text-sm font-medium'>Private</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Extension</span>
              <span className='text-gray-300 text-sm font-medium'>mp4</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Share link</span>
              <span className='text-gray-300 text-sm font-medium'>mp4</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Source</span>
              <span className='text-gray-300 text-sm font-medium'>
                Windows 11 Pro
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <span>No title</span>
            <span className='max-w-lg'>No description</span>
          </div>
        </div>
      </section>

      <section className='flex gap-10'>
        <section className='bg-zinc-900 flex rounded-lg items-center justify-center p-6'>
          <div className='flex gap-2 items-center divide-x-[1px] divide-gray-300/60'>
            <p className='text-xl font-medium inline-flex items-center gap-1'>
              Preview <BsInfoCircleFill />{' '}
            </p>
            <div className='px-3'>
              <label className='switch'>
                <input
                  title='preview checkbox'
                  onChange={(event) => setCheckboxState(event.target.checked)}
                  type='checkbox'
                />
                <span className='slider'></span>
              </label>
            </div>
          </div>
        </section>

        <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex gap-16'>
          <div className='flex gap-5'>
            <div className='bg-white flex items-center w-[20rem] px-4 py-2 rounded-lg text-black hover:ring-2 hover:ring-gray-500'>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                title='code'
                type='text'
                name='code'
                id='code'
                placeholder='JSDJ2'
                className='outline-none w-full h-full font-semibold'
              />
              {downloadState ? (
                <AiOutlineBarcode className='text-3xl' />
              ) : (
                <BsFillCheckCircleFill className='text-3xl text-green-500' />
              )}
            </div>
            <div className='flex items-center gap-5'>
              <button
                disabled={downloadState}
                className='px-4 py-2 rounded-lg bg-blue-500'
              >
                Download
              </button>
              <button className='px-4 py-2 rounded-lg bg-rose-500'>
                Delete File
              </button>
            </div>
          </div>
        </section>
      </section>

      {checkboxState && (
        <section className='w-fit p-6 bg-[#2c2c2c] rounded-lg flex gap-2 flex-col'>
          <Image
            width={1000}
            height={900}
            src='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
          />
        </section>
      )}
    </Main>
  );
};

export default FileDetails;
