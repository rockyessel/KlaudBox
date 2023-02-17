import React from 'react';
import {
  AiOutlinePlus,
  AiOutlineFieldTime,
  AiFillQuestionCircle,
  AiOutlineDownload,
} from 'react-icons/ai';
import { MdPublic, MdContentCopy } from 'react-icons/md';

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

        <section id='table' className='w-full h-[25rem]'>
          <table className='divide-y divide-[#515151]'>
            <thead className='sticky top-0 bg-[#2c2c2c] '>
              <tr className='pb-10'>
                <th className='py-4'>Name</th>
                <th className='py-4'>Download</th>
                <th className='py-4'>Privacy Status</th>
                <th className='py-4'>Deletion Date</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#515151]'>
              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                      <AiOutlineDownload />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload className='text-xl' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              {/* <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr>

              <tr>
                <td className='inline-flex flex-col'>
                  <span className='font-bold text-lg text-rose-500'>
                    bg.webp
                  </span>
                  <span className='font-semibold inline-flex gap-2 text-sm'>
                    <span>2/17/2023</span>
                    <span>38.67 KB </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex flex-col'>
                    <span className='font-bold text-rose-500 inline-flex items-center gap-1'>
                      {file_url} <MdContentCopy className='text-xl' />
                    </span>
                    <span className='inline-flex items-center gap-1 font-semibold'>
                      Download <AiOutlineDownload />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-4'>
                    <span className='text-green-500 inline-flex items-center gap-1'>
                      Everyone
                      <MdPublic />
                    </span>
                    <span>
                      <AiFillQuestionCircle className='' />
                    </span>
                  </span>
                </td>

                <td>
                  <span className='inline-flex items-center gap-1'>
                    2/17/2023
                    <AiOutlineFieldTime className='text-xl text-rose-500' />
                  </span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
};

export default Upload;
