import React, { ChangeEvent } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GuestFileUploadPost } from '../utils/api';
import { RiArrowDownSFill } from 'react-icons/ri';
import { MdPublic, MdVpnLock, MdPictureAsPdf } from 'react-icons/md';
import { SelectedFileInfoProps } from '../interface';
import { ImSpinner9 } from 'react-icons/im';

const Upload = () => {
  const [file, setFile] = React.useState<any>({});
  const [fileExist, setFileExist] = React.useState<boolean>(false);
  const [getFile, setGetFile] = React.useState<any>({});
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [deleteAfterState, setDeleteAfterState] =
    React.useState<boolean>(false);
  const [showDropdownValue, setShowDropdownValue] = React.useState<string>('');
  const [deleteAfter, setDeleteAfter] = React.useState<string>('0');
  const [selectedFileInfo, setSelectedFileInfo] =
    React.useState<SelectedFileInfoProps>({ name: '', size: '', type: '' });
  const [progress, setProgress] = React.useState(0);

  const fileUpdates = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile: any = files as FileList;
    setFile(selectedFile?.[0]);
  };

  console.log(file);

  const handleDelete = () => {
    setSelectedFileInfo({ name: '', size: '', type: '' });
    setFile({});
  };

  React.useEffect(() => {
    const file_size = file?.size;
    const file_size_MB = file_size / (1024 * 1024);
    const two_dec_place = file_size_MB.toFixed(2);
    setSelectedFileInfo((previous_value) => ({
      ...previous_value,
      name: file?.name,
      size: `${two_dec_place}MB`,
      type: file?.type,
    }));
  }, [file]);

  console.log(file);

  const handleSubmission = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.set('file', file);

      const data_ = await GuestFileUploadPost(data, setProgress);

      setGetFile(data_);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='w-full h-screen px-3 md:px-6 lg:px-20 xl:px-60 py-10 bg-[#F8F8F8] flex flex-col gap-5'>
      <section className='bg-white p-10'>
        <div>
          <p className='text-4xl font-bold'>Uploading made simple.</p>
          <p className='text-xl text-gray-400 mt-1'>
            Securely upload and share your files with peace of mind.
          </p>
        </div>

        {!file.length && (
          <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-full p-10 cursor-pointer hover:border-black hover:bg-gray-100'>
            <form onSubmit={handleSubmission}>
              <label className='cursor-pointer'>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-xl'>
                      <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                    </p>
                    <p className='text-xl font-semibold'>
                      Upload and share without limits
                    </p>
                  </div>

                  <p className='text-gray-400 text-center mt-10 text-sm leading-none inline-flex flex-col font-medium'>
                    <span> Audio, Docs, PDF, Applications, CSV and more</span>
                    <span>Less than 2 GB</span>
                  </p>

                  <p className='bg-black text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                    Select file
                  </p>
                </div>

                <input type='file' onChange={fileUpdates} className='w-0 h-0' />
              </label>
            </form>
          </div>
        )}
      </section>

      {file.length && (
        <section className='w-full bg-white p-10 flex flex-col gap-10'>
          <div className='flex w-full items-center'>
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
                    <ul className='bg-gray-200 absolute px-2 flex flex-col items-center py-2 rounded-md divide-y divide-black/20'>
                      <li
                        onClick={() => setShowDropdownValue('Public')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        {' '}
                        Public <MdPublic />{' '}
                      </li>
                      <li
                        onClick={() => setShowDropdownValue('Private')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        {' '}
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
                    <ul className='bg-gray-200 absolute right-5 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-black/20'>
                      <li
                        onClick={() => setDeleteAfter('1')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        1
                      </li>
                      <li
                        onClick={() => setDeleteAfter('2')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        2
                      </li>
                    </ul>
                  )}
                </li>
              </ul>

              <ul className='flex items-center gap-2 cursor-pointer'>
                {file ? (
                  <li
                    onClick={handleSubmission}
                    className='bg-green-700 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'
                  >
                    Start upload
                  </li>
                ) : (
                  <li
                    onClick={() => window.location.reload()}
                    className='bg-black text-center rounded text-white text-md font-medium px-4 py-2 outline-none'
                  >
                    Refresh Page
                  </li>
                )}
                {showDropdownValue === 'Public' && (
                  <li className='bg-blue-600 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'>
                    Share File
                  </li>
                )}
                <li
                  onClick={handleDelete}
                  className='bg-red-700 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'
                >
                  Delete
                </li>
              </ul>
            </nav>
          </div>

          {/* File Download Info */}

          {file && (
            <div className='bg-[#eeeeee] w-auto p-5 rounded-md flex flex-col gap-5'>
              <div className='w-full flex justify-between'>
                <div className='flex items-center gap-2.5'>
                  <MdPictureAsPdf className='text-5xl' />
                  <div className='flex flex-col'>
                    <p className='font-medium'>{selectedFileInfo?.name}</p>
                    <p className='font-medium text-black/60'>
                      <span>{selectedFileInfo?.size}</span>・
                      <span>1 minutes left</span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-stretch justify-center'>
                  <p>X</p>
                  <p>{progress}%</p>
                </div>
              </div>

              <div className='w-full h-1 bg-white'>
                <div
                  className='bg-black h-full transition duration-200 rounded-md'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Upload;
