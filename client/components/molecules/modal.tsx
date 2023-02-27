import React from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { MdPictureAsPdf } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import { MdPublic, MdVpnLock } from 'react-icons/md';
import { useGuestContext } from '@/context/GuestContext';

const Modal = ({ modalState, handleClose }: any) => {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [deleteAfterState, setDeleteAfterState] =
    React.useState<boolean>(false);
  const [showDropdownValue, setShowDropdownValue] = React.useState<string>('');
  const [deleteAfter, setDeleteAfter] = React.useState<string>('0');

  const { handleSubmission, fileUpdates, progress } = useGuestContext();

  const numbers = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  return (
    <section
      className={`w-full h-screen bg-black/90 text-white fixed top-0 right-0 flex justify-center items-center z-[10] ${
        modalState ? 'block' : 'hidden'
      }`}
    >
      <section className='w-[50rem] p-10 py-4 rounded-md flex flex-col gap-5 bg-gray-900'>
        <div className=' border-dashed  h-40 rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-full p-10 cursor-pointer hover:border-black'>
          <form onSubmit={handleSubmission}>
            <label className='cursor-pointer'>
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='font-bold text-xl'>
                    <BsFillCloudUploadFill className='text-gray-300 text-6xl' />
                  </p>
                </div>

                <p className='text-gray-400 text-center text-sm leading-none inline-flex flex-col font-medium'>
                  <span className='underline'>Click to upload</span>
                  <span>Maximum file size 2 GB</span>
                </p>
              </div>

              <input
                type='file'
                onChange={fileUpdates}
                name='file'
                className='w-0 h-0'
              />
            </label>
          </form>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-5'>
            <div className='border border-[#515151] rounded-lg w-auto p-5 flex flex-col gap-5'>
              <div className='w-full flex justify-between'>
                <div className='flex items-center gap-2.5'>
                  <MdPictureAsPdf className='text-5xl' />
                  <div className='flex flex-col'>
                    <p className='font-medium'>Nicepage-5.4.4.exe</p>
                    <p className='font-medium text-white'>
                      <span>323.3MB</span>・<span>1 minutes left</span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-stretch justify-center'>
                  <p>X</p>
                  <p>100%</p>
                </div>
              </div>

              <progress
                className='bg-gray-500 w-full h-full transition duration-200 rounded-md'
                value={`${progress}`}
                max={'100'}
              ></progress>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            {/* Sub Navbar */}
            <nav className='w-full flex items-center justify-between'>
              <ul className='flex items-center gap-4 font-medium'>
                <li
                  onClick={() => setShowDropdown((previous) => !previous)}
                  className='w-auto relative cursor-pointer'
                >
                  <span className='inline-flex items-center gap-1'>
                    Secure
                    {showDropdownValue === '' ? null : showDropdownValue ===
                      'Public' ? (
                      <MdPublic />
                    ) : (
                      <MdVpnLock />
                    )}
                    <RiArrowDownSFill
                      className={`${showDropdown ? 'rotate-180' : ''}`}
                    />
                  </span>

                  {showDropdown && (
                    <ul className='bg-[#2c2c2c] absolute px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>
                      <li
                        onClick={() => setShowDropdownValue('Public')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        Public <MdPublic />{' '}
                      </li>
                      <li
                        onClick={() => setShowDropdownValue('Private')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        Private <MdVpnLock />{' '}
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  onClick={() => setDeleteAfterState((previous) => !previous)}
                  className='w-auto relative cursor-pointer'
                >
                  <span className='inline-flex items-center gap-1'>
                    Delete after:{` `}
                    {deleteAfter === '0'
                      ? null
                      : deleteAfter === '1'
                      ? '1 day'
                      : `${deleteAfter} days`}
                    <RiArrowDownSFill
                      className={`${showDropdown ? 'rotate-180' : ''}`}
                    />
                  </span>

                  {deleteAfterState && (
                    <ul className='bg-[#2c2c2c] absolute right-5 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20 h-32 overflow-y-auto'>
                      {numbers?.map((num, index) => (
                        <li
                          key={index}
                          onClick={() => setDeleteAfter(`${num}`)}
                          className='w-full inline-flex items-center gap-2 py-1 px-2'
                        >
                          {num}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            {/* Title & Description */}

            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <label className='font-medium'>Message Title</label>
                <input
                  title='title'
                  type='text'
                  className='px-4 py-2 w-full text-black rounded-md outline-none focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='font-medium'>File Description</label>
                <input
                  title='description'
                  type='text'
                  className='px-4 py-2 w-full text-black rounded-md outline-none focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-between gap-10'>
          <button
            type='button'
            onClick={() => handleClose}
            className='bg-red-500 px-6 py-2 rounded-md w-full'
          >
            Close
          </button>
          <button
            type='submit'
            onClick={handleSubmission}
            className='bg-blue-500 px-6 py-2 rounded-md w-full'
          >
            Upload
          </button>
        </div>
      </section>
    </section>
  );
};

export default Modal;
