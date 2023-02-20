import React from 'react';
import {
  AiOutlinePlus,
  AiOutlineFieldTime,
  AiFillQuestionCircle,
  AiOutlineDownload,
} from 'react-icons/ai';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { SwitchViewOptions } from '../components';

const file_url = `https://cdn...file-dd679aeaa5c9d4bcdf2852041b230e6852-webm`;

const Upload = () => {
  const [viewOption, setViewOption] = React.useState<string>(
    `${window.localStorage.getItem('viewOption')}`
  );

  const [viewOptionState, setViewOptionState] = React.useState(false);

  React.useEffect(() => {
    window.localStorage.setItem('viewOption', viewOption);
    const option = window.localStorage.getItem('viewOption');
    setViewOption(`${option}`);
  }, [viewOption]);

  return (
    <main className='bg-[#212121] text-white h-screen px-6 xl:px-60 pt-5 flex flex-col gap-5'>
      <section className=' flex flex-col gap-5'>
        <p className='font-extrabold text-4xl'>Hey, Guest</p>
        <div className='w-full p-6 bg-[#2c2c2c] rounded-lg flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            <p className='font-bold text-2xl'>My Files</p>
            <div className='flex items-center justify-between'>
              <button className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'>
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
        <SwitchViewOptions viewOptions={viewOption} />
      </section>
    </main>
  );
};

export default Upload;

{
  /* <section className='flex flex-wrap items-center gap-10'>
  <div className='flex flex-col items-center bg-gray-600/60 rounded-lg p-5'>
    <BsImage className='text-[5rem] text-gray-300' />

    <div className='text-center'>
      <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
        Nicepage-5.4.4.exe
      </p>
      <p className='text-[0.8rem]'>Nov 30,2021</p>
    </div>
  </div>
</section> */
}

{
  /* <section className='w-[40rem] px-3 py-4 flex flex-col gap-5'>
          <div className=' border-dashed  h-40 rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-full p-10 cursor-pointer hover:border-black'>
            <form>
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

                <input type='file' className='w-0 h-0' />
              </label>
            </form>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='border border-[#515151] rounded-lg w-auto p-5 flex flex-col gap-5'>
              <div className='w-full flex justify-between'>
                <div className='flex items-center gap-2.5'>
                  <MdPictureAsPdf className='text-5xl' />
                  <div className='flex flex-col'>
                    <p className='font-medium'>Nicepage-5.4.4.exe</p>
                    <p className='font-medium text-black/60'>
                      <span>323.3MB</span>・<span>1 minutes left</span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-stretch justify-center'>
                  <p>X</p>
                  <p>100%</p>
                </div>
              </div>

              <div className='w-full h-1 bg-zinc-900'>
                <div
                  className='bg-black h-full transition duration-200 rounded-md'
                  style={{ width: `${100}%` }}
                ></div>
              </div>
            </div>
            <div className='border border-[#515151] rounded-lg w-auto p-5 flex flex-col gap-5'>
              <div className='w-full flex justify-between'>
                <div className='flex items-center gap-2.5'>
                  <MdPictureAsPdf className='text-5xl' />
                  <div className='flex flex-col'>
                    <p className='font-medium'>Nicepage-5.4.4.exe</p>
                    <p className='font-medium text-black/60'>
                      <span>323.3MB</span>・<span>1 minutes left</span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-stretch justify-center'>
                  <p>X</p>
                  <p>100%</p>
                </div>
              </div>

              <div className='w-full h-1 bg-zinc-900'>
                <div
                  className='bg-black h-full transition duration-200 rounded-md'
                  style={{ width: `${100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section> */
}
