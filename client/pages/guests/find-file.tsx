import React from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { Main, TypeSwitcher } from '@/components';

const FindFilePage = () => {
  const [code, setCode] = React.useState('');
  
  return (
    <Main>
      <section className='flex flex-col gap-4'>
        <p className='text-5xl text-center font-bold capitalize'>
          Everfile File download page
        </p>
        <p className='text-lg text-center'>
          Use your generated 5 alphanumeric code to download your file.
        </p>
      </section>

      <section className='flex justify-center items-center'>
        <form className='bg-white flex items-center w-full p-2 rounded-lg text-black font-semibold focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'>
          <input
            title='Code'
            onChange={(event) => setCode(event.target.value)}
            value={code}
            type='text'
            className='w-full text-xl outline-none'
          />
          <HiPaperAirplane className='text-4xl rounded-lg bg-gray-300/60 p-1 w-12 h-10 text-rose-700 cursor-pointer active:ring-2 active:ring-rose-500' />
        </form>
      </section>

      <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex flex-col'>
        <div className='flex gap-16'>
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
                <span className='text-gray-300 text-sm font-medium'>
                  34.3GB
                </span>
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
                <span className='text-gray-300 text-sm font-medium'>
                  Private
                </span>
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
        </div>
        <div className='flex items-center gap-5'>
          <button className='px-4 py-2 rounded-lg bg-blue-500'>Download</button>
          <button className='px-4 py-2 rounded-lg bg-rose-500'>
            Delete File
          </button>
        </div>
      </section>
    </Main>
  );
};

export default FindFilePage;
