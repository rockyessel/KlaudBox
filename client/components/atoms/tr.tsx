import React from 'react';
import {
  AiFillQuestionCircle,
  AiTwotoneDelete,
  AiFillEye,
} from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdContentCopy, MdPublic, MdVpnLock } from 'react-icons/md';
import TypeSwitcher from '../molecules/file-extension-switcher';
import { formatFileSize, next_day } from '../../utils/functions';
import { GuestFileModelProps } from '@/interface';
import { useGuestContext } from '@/context/guest-context';
import { BulkDeleteFiles } from '@/utils/api-request';
import Link from 'next/link';
import { format } from 'date-fns';

const TableRow = ({ data }: any): JSX.Element => {
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
    <tr className='bg-white border-b d'>
      <td>
        <TypeSwitcher class={`text-2xl`} extension={`${data?.extension}`} />
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
              <Link target={`_blank`} href={`/guests/files/${data?.cms_id}`}>
                <span className='inline-flex items-center gap-1'>
                  File Info
                  <HiOutlineExternalLink className='text-xl' />
                </span>
              </Link>
            )}
            {data?.secure === 'private' && (
              <span className='inline-flex items-center gap-1'>
                <Link href='/guests/find-file'>This file is private</Link>
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
          {data?.createdAt && format(new Date(data?.createdAt), 'MMM d, yyyy')}
        </span>
      </td>
      <td>
        <span>
          {data?.createdAt &&
            format(
              new Date(
                next_day(new Date(data?.createdAt), Number(data?.delete_after))
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
  );
};

export default TableRow;
