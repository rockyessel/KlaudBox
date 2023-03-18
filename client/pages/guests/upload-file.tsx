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
  } = useGuestContext();

  return (
    <>
      <Modal />

      <Main>
        <section className=' flex flex-col gap-5'>
          <div className='w-full p-2 bg-white shadow-lg rounded-lg flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <p className='font-bold text-2xl'>My Files</p>
              <div className='flex items-center justify-between'>
                <button
                  onClick={handleClose}
                  className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                >
                  Upload <AiOutlinePlus />
                </button>

                <form>
                  <select
                    title={viewOption}
                    value={viewOption}
                    onChange={(event) => setViewOption(event.target.value)}
                    name=''
                    id=''
                  >
                    <option value='List'>List</option>
                    <option value='Tiles'>Tiles</option>
                  </select>
                </form>
                {/* 
                <li
                  onClick={() => setViewOptionState((pre) => !pre)}
                  className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium relative'
                >
                  {selectedOption !== 'Tiles' ? (
                    <FaThList />
                  ) : (
                    <BsGrid1X2Fill />
                  )}
                  <span className='hidden sm:block'>{selectedOption}</span>
                  {viewOptionState && (
                    <ul className='bg-white text-[1rem] w-[10rem] absolute -left-[6.5rem] sm:-left-16 top-10 sm:top-12 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-black/20'>
                      <li
                        onClick={() => setViewOption('List')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        <FaThList /> List
                      </li>
                      <li
                        onClick={() => setViewOption('Compact List')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        <FaThList /> Compact List
                      </li>
                      <li
                        onClick={() => setViewOption('Tiles')}
                        className='w-full inline-flex items-center gap-2 py-1 px-2'
                      >
                        <BsGrid1X2Fill /> Tiles
                      </li>
                    </ul>
                  )}
                </li> */}
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
