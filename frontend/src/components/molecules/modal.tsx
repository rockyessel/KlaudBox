import React, { ChangeEvent } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { MdPictureAsPdf } from 'react-icons/md';
import { GuestFileUploadPost } from '../../utils/api';

const Modal = ({ modalState, handleClose }: any) => {
  const [file, setFile] = React.useState<any>({});
  const [progress, setProgress] = React.useState(0);
  const [getFile, setGetFile] = React.useState<any>({});
  const [localCollection, setLocalCollection] = React.useState<any>(() => {
    const guest_local_files = window.localStorage.getItem('guestCollection');
    return guest_local_files ? JSON.parse(guest_local_files) : [];
  });

  const memoizedLocalCollection = React.useMemo(() => {
    return localCollection;
  }, [localCollection]);

  React.useEffect(() => {
    window.localStorage.setItem(
      'guestCollection',
      JSON.stringify(localCollection)
    );
  }, [memoizedLocalCollection]);

  const fileUpdates = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile: any = files as FileList;
    setFile(selectedFile?.[0]);
  };

  const handleSubmission = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.set('file', file);

      const data_ = await GuestFileUploadPost(data, setProgress);

      const new_localCollection = [...localCollection, data_.file];
      setLocalCollection(new_localCollection);

      setGetFile(data_);

      console.log('getFile in', getFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      onClick={handleClose}
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

              <div className='w-full h-1 bg-white'>
                <div
                  className='bg-gray-500 h-full transition duration-200 rounded-md'
                  style={{ width: `${100}%` }}
                ></div>
              </div>
            </div>
          </div>
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

              <div className='w-full h-1 bg-white'>
                <div
                  className='bg-gray-500 h-full transition duration-200 rounded-md'
                  style={{ width: `${100}%` }}
                ></div>
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
