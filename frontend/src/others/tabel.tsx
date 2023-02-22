import React from 'react';
import {
  AiFillQuestionCircle,
  AiOutlineDownload,
  AiOutlineFieldTime,
} from 'react-icons/ai';
import { MdContentCopy, MdPublic } from 'react-icons/md';

const tabel = () => {
  const file_url = `https://cdn...file-dd679aeaa5c9d4bcdf2852041b230e6852-webm`;
  return (
    <div>
      <section id='table' className='w-full'>
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
                <span className='font-bold text-lg text-rose-500'>bg.webp</span>
                <span className='font-semibold inline-flex flex-col lg:flex-row gap-2 text-sm'>
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
                    Download <AiOutlineDownload className='text-xl' />
                  </span>
                </span>
              </td>

              <td>
                <span className='inline-flex items-center gap-2'>
                  <span className='text-green-500 inline-flex items-center gap-1'>
                    <span className='hidden lg:block'> Everyone</span>
                    <MdPublic />
                  </span>
                  <span>
                    <AiFillQuestionCircle className='hidden lg:block' />
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
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default tabel;
