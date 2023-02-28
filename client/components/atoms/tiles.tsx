import React from 'react';
import TypeSwitcher from '../molecules/media-type-switcher';

import { format } from 'date-fns';
import Link from 'next/link';
import { useGuestContext } from '@/context/GuestContext';
import { BulkDeleteFiles } from '@/utils/api-request';
import { GuestFileModelProps } from '@/interface';

const Tiles = ({ guestData }: { guestData: GuestFileModelProps[] }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const { fileLength, localCollection, setLocalCollection } = useGuestContext();

  const handleCheckboxChange = (event: any) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    if (isChecked) {
      setSelectedItems((previousValue) => [...previousValue, item]);
    } else {
      setSelectedItems(selectedItems?.filter((i: any) => i !== item));
    }
  };
  return (
    <>
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
      <ul className='flex flex-wrap'>
        {guestData?.map((data, index) => (
          <li
            key={index}
            className='flex relative flex-col items-center hover:bg-gray-600/60 cursor-pointer rounded-lg p-5'
          >
            <input
              className='checkbox checkbox-error absolute top-3 left-3'
              type='checkbox'
              title='checkbox'
              onChange={handleCheckboxChange}
              value={`${data?.identifier}`}
            />
            <TypeSwitcher
              class={`text-[5rem] text-gray-300`}
              extension={`${data?.extension}`}
            />

            <div className='text-center'>
              <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
                <Link href={`/guests/files/${data?.cms_id}`}>
                  {data?.originalFilename?.slice(0, 26)}
                </Link>
              </p>
              <time className='text-[0.8rem]'>
                {format(new Date(data?.createdAt), 'MMM d, yyyy')}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tiles;
