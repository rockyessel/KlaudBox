import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { Main, Modal, SwitchViewOptions } from '@/components';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { useGuestContext } from '@/context/guest-context';

const UploadFilePage = () => {
  const {
    handleClose,
    fileLength,
    setViewOption,
    setViewOptionState,
    viewOptionState,
    selectedOption,
    viewOption,
    isFileUploaded,
  } = useGuestContext();

  return (
    <>
      <Modal />
      <Main>
      {isFileUploaded && (
        <div className='w-full flex justify-center absolute top-10'>
          <div className='w-fit alert alert-success shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Your file was added successfully.</span>
          </div>
        </div>
      )}
        <section className=' flex flex-col gap-5'>
          <div className='w-full p-2 bg-white shadow-lg rounded-lg flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <p className='font-bold text-2xl'>My Files</p>
              <div className='flex items-center justify-between text-white '>
                <button
                  type='button'
                  title='Upload file'
                  onClick={handleClose}
                  className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                >
                  Upload <AiOutlinePlus />
                </button>

                <ul className='flex items-center gap-2'>
                  <li
                    onClick={() => setViewOption('Compact List')}
                    className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                  >
                    <FaThList />
                    List
                  </li>
                  <li
                    onClick={() => setViewOption('Tiles')}
                    className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                  >
                    <BsGrid1X2Fill /> Tiles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='p-6 w-full bg-white shadow-md rounded-lg flex flex-col gap-5 overflow-y-visible'>
          {fileLength ? (
            <SwitchViewOptions />
          ) : (
            <p>Uploads files to see them here!</p>
          )}
        </section>
      </Main>
    </>
  );
};

export default UploadFilePage;
