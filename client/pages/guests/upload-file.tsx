import React from 'react';
import {
  AiOutlinePlus,
  AiOutlineFileAdd,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { Main, Modal, SwitchViewOptions } from '@/components';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { useGuestContext } from '@/context/guest-context';
import { next_day } from '@/utils/functions';
import { GuestFileModelProps } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';

const UploadFilePage = () => {
  const [check, setCheck] = React.useState(0);
  const {
    handleClose,
    fileLength,
    setViewOption,
    setViewOptionState,
    viewOptionState,
    selectedOption,
    viewOption,
    isFileUploaded,
    handleDeleteFile,
    setLocalCollection,
  } = useGuestContext();

  const GuestScheduleDeletion = React.useCallback(() => {
    try {
      const user_files: GuestFileModelProps[] = JSON.parse(
        `${window.localStorage.getItem('guestCollection')}`
      );
      user_files?.map((file) => {
        const createdAt_ms = new Date(file?.createdAt).getTime();
        const expire_date = next_day(
          new Date(file?.createdAt),
          Number(file?.delete_after)
        ).toISOString();
        const today_in_ms = new Date().getTime();
        const expire_date_ms = new Date(expire_date).getTime();
        const expected_expiring_day = expire_date_ms - createdAt_ms;
        const difference_in_ms = today_in_ms - createdAt_ms;
        const difference_in_days = Math.floor(
          difference_in_ms / expected_expiring_day
        );
        if (difference_in_days >= Number(file?.delete_after))
          handleDeleteFile(file?.identifier);
      });
    } catch (error) {
      console.log(error);
    }
  }, [handleDeleteFile]);

  React.useEffect(() => {
    const id = setInterval(() => {
      GuestScheduleDeletion();
      console.log('10sec');
    }, 10000);
    return () => clearInterval(id);
  }, [GuestScheduleDeletion]);

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
          <div className='w-full p-2 bg-white shadow-lg rounded-sm flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <p className='font-bold text-2xl'>My Files</p>
              <div className='flex items-center justify-between text-white '>
                <button
                  type='button'
                  title='Upload file'
                  onClick={handleClose}
                  className='bg-rose-700 rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'
                >
                  <span className='hidden sm:block'>Upload</span>
                  <AiOutlinePlus />
                </button>

                <ul className='flex items-center gap-2 cursor-pointer'>
                  <li
                    onClick={() => setViewOption('Compact List')}
                    className='bg-rose-700 rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'
                  >
                    <FaThList />
                    <span className='hidden sm:block'>List</span>
                  </li>
                  <li
                    onClick={() => setViewOption('Tiles')}
                    className='bg-rose-700 rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'
                  >
                    <BsGrid1X2Fill />
                    <span className='hidden sm:block'>Tiles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-4'>
          <p className='px-4 py-2 bg-white shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-1'>
            <AiOutlineInfoCircle className='text-5xl flex-shrink-0 h-10 w-10 text-rose-800' />
            <span>
              You can access your files from any device with just your file
              code.
            </span>
          </p>
          <p className='px-4 py-2 bg-white shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-1'>
            <AiOutlineInfoCircle className='text-5xl flex-shrink-0 h-10 w-10 text-rose-800' />
            <span>
              <Link
                className='cursor-pointer hover:underline font-medium text-rose-800'
                href='/accounts/register'
              >
                Register
              </Link>{' '}
              or{' '}
              <Link
                className='cursor-pointer hover:underline font-medium text-rose-800'
                href='/accounts/login'
              >
                Login
              </Link>{' '}
              to view, play, share, download, upload, and access your files
              anywhere in the world.
            </span>
          </p>
        </section>

        <section className='p-6 w-full bg-white shadow-md rounded-sm flex flex-col gap-5 overflow-y-visible mb-10'>
          {fileLength ? (
            <SwitchViewOptions />
          ) : (
            <div className='w-full py-10 flex flex-col gap-5 justify-center items-center'>
              <div className='w-[10rem]'>
                <Image src='/2813836.svg' width={1000} height={1000} alt='' />
              </div>
              <p className='text-center'>Uploads files to see them here!</p>
            </div>
          )}
        </section>
      </Main>
    </>
  );
};

export default UploadFilePage;
