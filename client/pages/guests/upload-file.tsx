import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { Main, Modal, SwitchViewOptions } from '@/components';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { useGuestContext } from '@/context/guest-context';
import { next_day } from '@/utils/functions';
import { GuestFileModelProps } from '@/interface';

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
    

  
  React.useEffect(() => {
    const GuestScheduleDeletion =  () => {
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
        //  console.log('file?.delete_after', file?.delete_after);
  
         const expire_date_ms = new Date(expire_date).getTime();
        //  console.log('expire_date_ms', expire_date_ms);
  
         const expected_expiring_day = expire_date_ms - createdAt_ms;
        //  console.log('expected_expiring_day', expected_expiring_day);
  
         const difference_in_ms = today_in_ms - createdAt_ms;
        //  console.log('difference_in_ms', difference_in_ms);
  
         const difference_in_days = Math.floor(
           difference_in_ms / expected_expiring_day
         );
        //  console.log('difference_in_days', difference_in_days);
  
         if (difference_in_days >= Number(file?.delete_after)) {
           handleDeleteFile(file?.identifier);
         }
        });
     } catch (error) {
       console.log(error);
     }
   };
    const id = setInterval(() => {
      GuestScheduleDeletion();
    }, 10000);
    return () => clearInterval(id);
  }, [handleDeleteFile]);

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
