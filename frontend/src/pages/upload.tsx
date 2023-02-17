import React from 'react';
import {
  AiOutlinePlus,
  AiOutlineFieldTime,
  AiFillQuestionCircle,
  AiOutlineDownload,
} from 'react-icons/ai';
import { MdPublic, MdContentCopy, MdPictureAsPdf } from 'react-icons/md';
import { BsImage, BsFillCloudUploadFill } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';

const file_url = `https://cdn...file-dd679aeaa5c9d4bcdf2852041b230e6852-webm`;

const Upload = () => {
  return (
    <main className='bg-[#212121] text-white h-screen px-6 xl:px-20 flex flex-col gap-10'>
      <p className='font-extrabold text-4xl'>Hey, Guest</p>
      <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex flex-col gap-5'>
        <section className='flex flex-col gap-5'>
          <p className='font-bold text-2xl'>My Files</p>
          <button className='bg-rose-700 rounded-lg w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'>
            Upload <AiOutlinePlus />
          </button>
        </section>

        <section className='flex flex-wrap items-center gap-10'>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
          <div>
            <BsImage className='text-[10rem] text-[#212121]' />

            <div>
              <p className='text-rose-500 font-bold'>Nicepage-5.4.4.exe</p>
            </div>
          </div>
        </section>

        <section className='w-[40rem] px-3 py-4 flex flex-col gap-5'>
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
        </section>
      </section>
    </main>
  );
};

export default Upload;
