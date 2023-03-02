import React from 'react';
import {
  AiFillQuestionCircle,
  AiTwotoneDelete,
  AiFillEye,
} from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdContentCopy, MdPublic, MdVpnLock } from 'react-icons/md';
import TypeSwitcher from '../molecules/media-type-switcher';
import { formatFileSize, next_day } from '../../utils/functions';
import { GuestFileModelProps } from '@/interface';
import { useGuestContext } from '@/context/GuestContext';
import { BulkDeleteFiles } from '@/utils/api-request';
import Link from 'next/link';
import { format } from 'date-fns';

const CompactList = ({ guestData }: { guestData: GuestFileModelProps[] }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const { fileLength, localCollection, setLocalCollection, handleDeleteFile } =
    useGuestContext();

  const handleCheckboxChange = (event: any) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    if (isChecked) {
      console.log('selectedItems', selectedItems);
      setSelectedItems((previousValue: any) => [
        ...previousValue,
        // ...selectedItems,
        item,
      ]);
    } else {
      setSelectedItems(selectedItems?.filter((i: any) => i !== item));
    }
  };

  return (
    <section
      className={`inline-block overflow-x-auto whitespace-nowrap text-sm  ${
        fileLength > 6 ? 'h-[30rem]' : 'h-auto'
      }`}
    >
      <div className='flex items-center gap-5'>
        {selectedItems && selectedItems.length !== 0 ? (
          <p className='bg-[#212121] px-4 py-2 rounded-lg w-fit'>
            {selectedItems?.length}/{fileLength} is selected
          </p>
        ) : (
          <p className='bg-[#212121] px-4 py-2 rounded-lg w-fit'>
            {fileLength} files
          </p>
        )}

        {selectedItems && selectedItems.length !== 0 ? (
          <button
            className='bg-rose-700 px-4 py-2 rounded-lg w-fit'
            type='button'
            onClick={() =>
              BulkDeleteFiles(
                selectedItems,
                localCollection,
                setLocalCollection
              )
            }
          >
            Bulk Delete
          </button>
        ) : (
          <p></p>
        )}
      </div>
      <table className='divide-y divide-[#515151] w-full'>
        <thead className='sticky top-0 bg-[#2c2c2c]'>
          <tr className='pb-10 z-0'>
            <th className='py-4'>
              <input
                title='checkbox'
                value={''}
                name='all'
                type='checkbox'
                className='checkbox checkbox-error'
              />
            </th>
            <th className='py-4 font-normal'>Icon</th>
            <th className='py-4 font-normal'>Name</th>
            <th className='py-4 font-normal'>Link</th>
            <th className='py-4 font-normal'>Size</th>
            <th className='py-4 font-normal'>Uploaded on</th>
            <th className='py-4 font-normal'>Deleted on</th>
            <th className='py-4 font-normal'>Code</th>
            <th className='py-4 font-normal'>Sharing</th>
            <th className='py-4 font-normal'>Action</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-[#515151]'>
          {guestData?.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  onChange={handleCheckboxChange}
                  title='checkbox'
                  name={`checkbox_${index + 1} all`}
                  type='checkbox'
                  value={data.identifier}
                  className='checkbox checkbox-error'
                />
              </td>

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
              </td>

              <td>
                <span className='inline-flex flex-col'>
                  <span className='text-rose-500 inline-flex items-center gap-1'>
                    {data?.secure === 'public' && (
                      <Link
                        target={`_blank`}
                        href={`/guests/files/${data?.cms_id}`}
                      >
                        <span className='inline-flex items-center gap-1'>
                          File Info
                          <HiOutlineExternalLink className='text-xl' />
                        </span>
                      </Link>
                    )}
                    {data?.secure === 'private' && (
                      <span className='inline-flex items-center gap-1'>
                        <Link href='/guests/find-file'>
                          This file is private
                        </Link>
                        <HiOutlineExternalLink className='text-xl' />
                      </span>
                    )}
                  </span>
                </span>
              </td>

              <td>
                <span>{formatFileSize(Number(data?.size))}</span>
              </td>
              <td>
                <span>
                  {data?.createdAt &&
                    format(new Date(data?.createdAt), 'MMM d, yyyy')}
                </span>
              </td>
              <td>
                <span>
                  {data?.createdAt &&
                    format(
                      new Date(
                        next_day(
                          new Date(data?.createdAt),
                          Number(data?.delete_after)
                        )
                      ),
                      'MMM d, yyyy'
                    )}
                </span>
              </td>
              <td>
                <span>{data?.identifier}</span>
              </td>

              <td>
                <span className='inline-flex items-center gap-2'>
                  <span>
                    {data?.secure === 'public' ? (
                      <span className='text-green-500 inline-flex items-center gap-1'>
                        Everyone <MdPublic />
                      </span>
                    ) : (
                      <span className='text-rose-500 inline-flex items-center gap-1'>
                        Private <MdVpnLock />
                      </span>
                    )}
                  </span>
                  <span>
                    <AiFillQuestionCircle className='hidden lg:block' />
                  </span>
                </span>
              </td>

              <td>
                <span className='inline-flex items-center gap-2'>
                  <button
                    onClick={() => handleDeleteFile(data?.identifier)}
                    className='inline-flex items-center gap-1 text-rose-500'
                  >
                    <span> Delete</span>
                    <AiTwotoneDelete />
                  </button>
                  <Link href={`/guests/files/${data?.cms_id}`}>
                    <span className='inline-flex items-center gap-1'>
                      <span className=''> View</span>
                      <AiFillEye />
                    </span>
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CompactList;
