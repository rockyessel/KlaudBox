import React from 'react';
import { FileExtensionSwitcher } from '../index';
import { RiMore2Fill } from 'react-icons/ri';

const TableRow = ():JSX.Element => {
  const [showAction, setShowAction] = React.useState<boolean>(false);

  const handleShowState = () => setShowAction(!showAction);

  console.log('showAction', showAction);
  return (
    <tr className='bg-white border-b d'>
      <td className='w-4 p-4'>
        <input title='checkbox' type='checkbox' className='checkbox' />
        <label className='sr-only'>checkbox</label>
      </td>
      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap inline-flex items-center gap-2'>
        <FileExtensionSwitcher class={`text-2xl`} extension={`png`} />
        <span>Apple MacBook Pro 17.png</span>
      </th>
      <td className='px-6 py-4'>12 MB</td>
      <td className='px-6 py-4'>30 June 2023</td>
      <td className='px-6 py-4'>Only you</td>
      <td className='px-6 py-4 inline-flex items-center text-gray-500 relative cursor-pointer'>
        <RiMore2Fill onClick={handleShowState} />
        <ul
          className={`absolute w-64 top-10 right-10 bg-white rounded-lg shadow-lg divide-y-[1px] divide-gray-200/30 p-2 ${
            showAction ? 'block' : 'hidden'
          }`}
        >
          <li className='px-4 py-2'>Generate temporal file link</li>
          <li className='px-4 py-2'>Details</li>
          <li className='px-4 py-2'>Share</li>
          <li className='px-4 py-2'>Favorite</li>
          <li className='px-4 py-2'>Delete</li>
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
