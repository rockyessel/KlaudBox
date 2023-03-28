import React from 'react';
import { ImUpload } from 'react-icons/im';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import FileExtensionSwitcher from './file-extension-switcher';
import CircleProgressbar from '../atoms/circle-progressbar';
import { BsFiles } from 'react-icons/bs';
import UploadFileCard from './upload-file-card';
import { useUserContext } from '@/context/user-context';
import { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { post_files } from '@/reduxtoolkit/features/files/files-request';

const UserModal = () => {
  const [arrFiles, setArrFiles] = React.useState<File[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [allFilesUploadPercent, setAllFilesUploadPercent] = React.useState(0);
  const [urlValue, setUrlValue] = React.useState('');
  const dispatch: AppDispatch = useDispatch();

  const { handleModalState,fileCaching, setFileCaching } = useUserContext();

  const handleRemoveFile = (name: string) => {
    const removed_file = arrFiles.filter((file) => file.name !== name);
    setArrFiles(removed_file);
  };


  const handleFile = (event: any) => {
    const file: File[] = event.target.files;
    const arr = [...arrFiles, ...file];
    setArrFiles(Array.prototype.slice.call(arr));
  };

  const handleClear = () => {
    setArrFiles([]);
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const data = new FormData();
      arrFiles.forEach((file) => {
        data.append(`files`, file);
      });
      const file_ = await dispatch(post_files({ data, setProgress }));
      const addFilesExisting = [...fileCaching, ...file_?.payload?.result]
      setFileCaching(addFilesExisting)
      localStorage.setItem('cachingUserFiles', JSON.stringify(addFilesExisting))
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='fixed bg-gray-50/90 w-full h-full flex items-center justify-center md:px-10 z-[100]'>
      <section className='bg-white transition ease-in-out delay-150 shadow-lg rounded-lg px-4 py-10 flex flex-col gap-5 w-full lg:w-[50rem]'>
        <div className='flex flex-col gap-1'>
          <p className='font-bold'>Import files</p>
          <p>Upload any type of files from local machine</p>
        </div>

        {urlValue.length > 0 ? null : (
          <label className='rounded-lg border-dashed border-2 border-gray-900/50 flex flex-col items-center justify-center p-5'>
            {arrFiles.length > 0 ? (
              <React.Fragment>
                <CircleProgressbar percent={allFilesUploadPercent} />
                <p className='font-bold'>Click import to start the process</p>
                <p className='inline-flex items-center text-sm font-semibold gap-1'>
                  Total files, your&apos;re importing
                  <span className='font-extrabold inline-flex items-center'>
                    {arrFiles.length} <BsFiles />
                  </span>
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ImUpload className='text-7xl' />
                <span>Click to browse(50 GB)</span>
                <input
                  type='file'
                  name='file'
                  className='w-0 h-0'
                  onChange={handleFile}
                  multiple
                />
              </React.Fragment>
            )}
          </label>
        )}

        {arrFiles.length > 0 && (
          <React.Fragment>
            <section className='w-full flex justify-end items-center gap-2'>
              <label className='bg-blue-100 shadow-lg hover:bg-blue-200 text-blue-800 font-medium rounded-md px-2 py-1'>
                Add more
                <input
                  type='file'
                  name='file'
                  className='w-0 h-0'
                  onChange={handleFile}
                  multiple
                />
              </label>
              <button
                className='bg-rose-100 shadow-lg hover:bg-rose-200 text-rose-800 font-medium rounded-md px-2 py-1'
                type='button'
                title='Clear'
                onClick={handleClear}
              >
                Clear
              </button>
            </section>

            <ul
              className={`flex flex-col gap-1 overflow-auto ${
                arrFiles.length > 2 ? 'h-[10rem]' : ''
              }`}
            >
              {arrFiles?.map((file, index) => (
                <UploadFileCard
                  handleRemoveFile={handleRemoveFile}
                  key={index}
                  file={file}
                  progress={progress}
                />
              ))}
            </ul>
          </React.Fragment>
        )}

        {!arrFiles.length && (
          <section className='flex flex-col gap-2'>
            <p className='font-bold'>Upload from URL</p>
            <div className='rounded-md border-[1px] border-gray-500/30 flex items-center justify-between'>
              <span className='border-r-[1px] border-gray-500/30 h-full p-2.5'>
                https://
              </span>
              <input
                title='Upload from URL'
                type='url'
                value={urlValue}
                onChange={(event) => setUrlValue(event.target.value)}
                className='outline-none border-none bg-transparent w-full px-2.5'
              />
              <button className='p-1.5 mr-1 border-[1px] border-gray-500/30 rounded-md text-sm font-medium'>
                Upload
              </button>
            </div>
          </section>
        )}

        <section className='flex items-center justify-between py-5'>
          <span className='inline-flex items-center gap-2'>
            <RxQuestionMarkCircled /> <span>Support</span>
          </span>
          <div className='flex items-center gap-5'>
            <button
              type='button'
              title='Discard'
              onClick={handleModalState}
              className='border-[1px] border-gray-500/50 px-2 py-1 rounded-md'
            >
              Discard
            </button>
            <button
              disabled={!arrFiles.length}
              type='button'
              title='Import'
              onClick={handleSubmission}
              className={`bg-pink-800 text-white rounded-md px-2 py-1 ${
                !arrFiles.length ? 'bg-pink-200 cursor-not-allowed' : ''
              }`}
            >
              Import
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserModal;
