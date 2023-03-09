import React, { ChangeEvent } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { RiArrowDownSFill } from 'react-icons/ri';
import { MdPublic, MdVpnLock } from 'react-icons/md';
import { useGuestContext } from '@/context/guest-context';
import { formatFileSize } from '@/utils/functions';
import TypeSwitcher from './media-type-switcher';

const Modal = () => {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [deleteAfterState, setDeleteAfterState] =
    React.useState<boolean>(false);
  const [showDropdownValue, setShowDropdownValue] =
    React.useState<string>('public');
  const [deleteAfter, setDeleteAfter] = React.useState<string>('1');

  const {
    handleSubmission,
    fileUpdates,
    progress,
    file,
    modalState,
    handleClose,
    setModalState,
    modalFormData,
    setModalFormData,
  } = useGuestContext();

  const isFileSelected: boolean = file === '' || file === undefined || file === null;
  const isFileStarted: boolean = progress > 0
  const state = isFileSelected || isFileStarted;

  const numbers = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  const un_file: any = file;

  const extension = un_file?.name?.split('.').pop();

  const handleModalForm = (event: ChangeEvent<HTMLInputElement>) => {
    setModalFormData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
      secure: showDropdownValue,
      delete_after: deleteAfter,
    }));
  };

  return (
    <section
      className={`w-full h-screen bg-black/90 text-white fixed top-0 right-0 flex justify-center items-center z-[10] px-6 ${
        modalState ? 'block' : 'hidden'
      }`}
    >
      <section className='w-[50rem] p-10 py-4 rounded-md flex flex-col gap-5 bg-gray-700'>
        <div className=' border-dashed  h-40 rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-full p-10 cursor-pointer hover:border-gray-300'>
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

        {!isFileSelected && (
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-5'>
              <div className='border border-[#515151] rounded-lg w-auto p-5 flex flex-col gap-5'>
                <div className='w-full flex justify-between'>
                  <div className='flex items-center gap-2.5'>
                    <TypeSwitcher class='text-7xl' extension={`${extension}`} />
                    <div className='flex flex-col'>
                      <p className='font-medium'>{un_file?.name}</p>
                      <p className='font-medium text-white flex items-center'>
                        <span>{formatFileSize(un_file?.size)}</span>・
                        <span className='animate-pulse flex gap-1 items-center'>
                          <span className='w-2 h-2 bg-slate-400 rounded-full'></span>
                          <span className='w-2 h-2 bg-slate-400 rounded-full'></span>
                          <span className='w-2 h-2 bg-slate-400 rounded-full'></span>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col items-stretch justify-between'>
                    <p>
                      <FaTimes className='text-xl' />
                    </p>
                  </div>
                </div>

                <div className='relative pt-1'>
                  <div className='flex mb-2 items-center justify-between'>
                    <div>
                      <span className='animate-pulse text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200'>
                        {progress === 100
                          ? 'Upload completed'
                          : progress === 0
                          ? 'Start Upload'
                          : 'Upload in progress...'}
                      </span>
                    </div>
                    <div className='text-right'>
                      <span className='text-xs font-semibold inline-block text-pink-600'>
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200'>
                    <div
                      style={{ width: `${progress}%` }}
                      className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500'
                    ></div>
                  </div>
                </div>
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
                        'public' ? (
                        <MdPublic className='text-green-500' />
                      ) : (
                        <MdVpnLock className='text-rose-500' />
                      )}
                      <RiArrowDownSFill
                        className={`${showDropdown ? 'rotate-180' : ''}`}
                      />
                    </span>

                    {showDropdown && (
                      <ul className='bg-[#2c2c2c] absolute px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>
                        <li
                          onClick={() => setShowDropdownValue('public')}
                          className='w-full inline-flex items-center gap-2 py-1 px-2'
                        >
                          Public <MdPublic />{' '}
                        </li>
                        <li
                          onClick={() => setShowDropdownValue('private')}
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
                    value={modalFormData.title}
                    title='title'
                    name='title'
                    type='text'
                    onChange={handleModalForm}
                    className='px-4 py-2 w-full text-black rounded-md outline-none focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium'>File Description</label>
                  <input
                    value={modalFormData.description}
                    title='description'
                    name='description'
                    type='text'
                    onChange={handleModalForm}
                    className='px-4 py-2 w-full text-black rounded-md outline-none focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='w-full flex justify-between gap-10'>
          <button
            type='button'
            disabled={isFileStarted}
            onClick={handleClose}
            className={`bg-red-500 px-6 py-2 rounded-md w-full ${
              isFileStarted
                ? 'cursor-not-allowed bg-opacity-20 text-gray-700'
                : ''
            }`}
          >
            Close
          </button>
          <button
            disabled={state}
            type='submit'
            onClick={handleSubmission}
            className={`bg-blue-500 px-6 py-2 rounded-md w-full ${
              state ? 'cursor-not-allowed bg-opacity-20 text-gray-700' : ''
            }`}
          >
            Upload
          </button>
        </div>
      </section>
    </section>
  );
};

export default Modal;
