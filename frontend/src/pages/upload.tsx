import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { Modal, SwitchViewOptions } from '../components';
import { BsGrid1X2Fill } from 'react-icons/bs';

const Upload = () => {
  const [fileLength, setFileLength] = React.useState<number>(0);
  const [viewOption, setViewOption] = React.useState<string>(() => {
    const view = window.localStorage.getItem('viewOption');
    return view ? view : 'List';
  });
  const [modalState, setModalState] = React.useState(false);
  const [viewOptionState, setViewOptionState] = React.useState(false);

  const handleClose = () => {
    setModalState((prevState: boolean) => !prevState);
  };

  console.log('modalState', modalState);

  React.useEffect(() => {
    window.localStorage.setItem('viewOption', viewOption);
    const option = window.localStorage.getItem('viewOption');
    setViewOption(`${option}`);

    const localFiles = window.localStorage.getItem('guestCollection');
    const files = JSON.parse(`${localFiles}`);

    setFileLength(files.length);
  }, [viewOption]);

  return (
    <>
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        handleClose={handleClose}
      />

      <main className='bg-[#212121] text-white h-screen px-6 xl:px-60 pt-5 flex flex-col gap-5'>
        <section className=' flex flex-col gap-5'>
          <p className='font-extrabold text-4xl'>Hey, Guest</p>
          <div className='w-full p-6 bg-[#2c2c2c] rounded-lg flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <p className='font-bold text-2xl'>My Files</p>
              <div className='flex items-center justify-between'>
                <button
                  onClick={handleClose}
                  className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                >
                  Upload <AiOutlinePlus />
                </button>
                <div className='flex items-center gap-5'>
                  <button
                    onClick={() => setViewOptionState((pre) => !pre)}
                    className='bg-rose-700 relative rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
                  >
                    {viewOption !== 'Tiles' ? <FaThList /> : <BsGrid1X2Fill />}
                    <span className='hidden sm:block'>{viewOption}</span>
                    {viewOptionState && (
                      <ul className='bg-[#3d3d3d] text-[1rem] w-[10rem] z-[1] drop-shadow-lg absolute top-12 left-0 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-black/20'>
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
                  </button>
                  <button className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'>
                    Info <AiOutlinePlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='p-6 w-full bg-[#2c2c2c] rounded-lg flex flex-col gap-5 overflow-y-visible'>
          {fileLength ? (
            <SwitchViewOptions viewOptions={viewOption} />
          ) : (
            <p>Uploads files to see them here!</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Upload;

{
}
