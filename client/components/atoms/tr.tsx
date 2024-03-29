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

const TableRow = ({ data }: { data: GuestFileModelProps }): JSX.Element => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [justAdded, setJustAdded] = React.useState<boolean>(false);

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

  const createdAt = new Date(`${data?.createdAt}`);
  const currentTime = new Date();
  const differenceInSeconds =
    (currentTime.getTime() - createdAt.getTime()) / 1000;

  React.useEffect(() => {
    const isRecentlyUploaded = differenceInSeconds <= 10;
    setJustAdded(isRecentlyUploaded);
    const turnFalse = setTimeout(() => {
      setJustAdded(false);
    }, 5000);

    return () => clearTimeout(turnFalse);
  }, [data?.createdAt, differenceInSeconds]);

  return (
    <tr
      className={`bg-white border-b ${
        justAdded ? 'bg-green-200 text-green-700' : null
      }`}
    >
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
              <Link
                className='tooltip'
                target={`_blank`}
                href={`/guests/files/${data?.cms_id}`}
              >
                <span className='inline-flex items-center gap-1'>
                  View File
                  <HiOutlineExternalLink className='text-xl' />
                </span>
              </Link>
            )}
            {data?.secure === 'private' && (
              <Link
                target={`_blank`}
                href={`/guests/find-file?code=${data?.identifier}`}
              >
                <span className='inline-flex items-center gap-1'>
                  Find with code
                  <HiOutlineExternalLink className='text-xl' />
                </span>
              </Link>
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
              <span
                className='text-green-500 inline-flex items-center gap-1 tooltip'
                data-tip='Everyone with the file URL or code have access to the file.'
              >
                Everyone <MdPublic />
              </span>
            ) : (
              <span
                className='text-rose-500 inline-flex items-center gap-1 tooltip'
                data-tip='Anyone with the file URL cannot access the file, but can access it with the file code. So keep it safe.'
              >
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
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
