import React from 'react';
import { ImUpload } from 'react-icons/im';
import { TypeSwitcher } from '../index';

const UserModal = () => {
  const [progress, setProgress] = React.useState(0);
  return (
    <main className='fixed bg-gray-50/90 w-full h-full flex items-center justify-center'>
      <section className='bg-white shadow-lg rounded-lg px-4 py-2 flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <p className='font-bold'>Import files</p>
          <p>Upload any type of files from local machine</p>
        </div>

        <label className='rounded-lg border-dashed border-2 border-gray-900/50 flex flex-col items-center justify-center p-5'>
          <ImUpload className='text-7xl' />
          <span>Click to browse(50 GB)</span>
          <input type='file' name='file' className='w-0 h-0' multiple />
        </label>

        <section className='rounded-lg px-4 py-2 border-[1px] border-gray-500/50'>
          <div className='flex mb-2 items-center gap-2'>
            <TypeSwitcher class='text-2xl' extension={`png`} />

            <div className='flex flex-col'>
              <div className='w-full flex mb-2 items-center justify-between'>
                <span>The lord of the ring.mp4</span>
                <span className='text-xs font-semibold inline-block text-rose-600 text-right'>
                  {progress}%
                </span>
              </div>

              <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-rose-200'>
                <div
                  style={{ width: `${progress}%` }}
                  className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500'
                ></div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserModal;
