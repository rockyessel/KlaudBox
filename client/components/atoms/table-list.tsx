import React from 'react';
import {
  AiFillQuestionCircle,
  AiTwotoneDelete,
  AiFillEye,
} from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdContentCopy, MdPublic, MdVpnLock } from 'react-icons/md';
import TypeSwitcher from '../molecules/file-extension-switcher';
import { formatFileSize } from '../../utils/functions';
import { GuestFileModelProps } from '@/interface';
import { useGuestContext } from '@/context/guest-context';
import { BulkDeleteFiles } from '@/utils/api-request';
import Link from 'next/link';
import TableRow from './tr';

const TableList = ({ guestData }: { guestData: GuestFileModelProps[] }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const { fileLength, localCollection, setLocalCollection, handleDeleteFile } =
    useGuestContext();

  const handleCheckboxChange = (event: any) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    if (isChecked) {
      setSelectedItems((previousValue: any) => [...previousValue, item]);
    } else {
      setSelectedItems(selectedItems?.filter((i: any) => i !== item));
    }
  };

  return (
    <section
      className={`inline-block overflow-x-auto whitespace-nowrap  ${
        fileLength > 6 ? 'h-[30rem]' : 'h-auto'
      }`}
    >
      <div className='flex items-center gap-5'>
        {selectedItems && selectedItems.length !== 0 ? (
          <button className='bg-[#212121] btn px-4 py-2 rounded-lg w-fit'>
            {selectedItems?.length}/{fileLength} is selected
          </button>
        ) : (
          <button className='bg-[#212121] btn px-4 py-2 rounded-lg w-fit'>
            {fileLength} files
          </button>
        )}

        {selectedItems && selectedItems.length !== 0 ? (
          <button
            className='bg-rose-700 btn px-4 py-2 rounded-lg w-fit'
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

      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 bg-gray-50'>
          <tr>
            <th className='px-6 py-3'>Icon</th>
            <th className='px-6 py-3'>Name</th>
            <th className='px-6 py-3'>Link</th>
            <th className='px-6 py-3'>Size</th>
            <th className='px-6 py-3'>Uploaded on</th>
            <th className='px-6 py-3'>Deleted on</th>
            <th className='px-6 py-3'>Code</th>
            <th className='px-6 py-3'>Sharing</th>
            <th className='px-6 py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {guestData?.map((data, index) => (
            <TableRow key={index} data={data} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableList;
