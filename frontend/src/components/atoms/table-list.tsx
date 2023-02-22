import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { MdContentCopy, MdPublic } from 'react-icons/md';
import TypeSwitcher from '../molecules/media-type-switcher';
import { formatFileSize } from '../../utils/functions';

const file_url = `://localhost:5173/files/file`;

const TableList = ({ guestData }:any) => {
  return (
    <section className=' inline-block overflow-x-auto whitespace-nowrap'>
      <table className='divide-y divide-[#515151] w-full'>
        <thead className='sticky top-0 bg-[#2c2c2c]'>
          <tr className='pb-10 z-0'>
            <th className='py-4'>Icon</th>
            <th className='py-4'>Name</th>
            <th className='py-4'>Link</th>
            <th className='py-4'>Size</th>
            <th className='py-4'>Code</th>
            <th className='py-4'>Sharing</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-[#515151]'>
          {guestData?.map((data: any, index: number) => (
            <tr key={index}>
              <td>
                <TypeSwitcher
                  class={`text-2xl`}
                  extension={`${data?.extension}`}
                />
              </td>
              <td className='inline-flex flex-col'>
                <span className='text-rose-500'>
                  {data?.originalFilename?.slice(0, 26)}
                </span>
                <span className='font-semibold inline-flex flex-col lg:flex-row gap-2 text-sm'>
                  {/* <span>2/17/2023</span> */}
                </span>
              </td>

              <td>
                <span className='inline-flex flex-col'>
                  <span className='text-rose-500 inline-flex items-center gap-1'>
                    { data?.isPublic ? `ht.../${data?.cms_id}?identifier=data?.identifier` : `ht...${data?.cms_id}` }
                    <MdContentCopy className='text-xl' />
                  </span>
                </span>
              </td>

              <td>
                <span>{formatFileSize(data?.size)} </span>
              </td>
              <td>
                <span>{data?.identifier}</span>
              </td>

              <td>
                <span className='inline-flex items-center gap-2'>
                  <span className='text-green-500 inline-flex items-center gap-1'>
                    <span className=''> Everyone</span>
                    <MdPublic />
                  </span>
                  <span>
                    <AiFillQuestionCircle className='hidden lg:block' />
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableList;
