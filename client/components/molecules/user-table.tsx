import React from 'react';
import { TableRow } from '../index';

const UserTable = () => {
  return (
    <table className='w-full text-sm text-left text-gray-500'>
      <thead className='text-xs text-gray-700 bg-gray-50'>
        <tr>
          <th className='p-4'>
            <input title='checkbox' type='checkbox' className='checkbox' />
            <label className='sr-only'>checkbox</label>
          </th>
          <th className='px-6 py-3'>Name</th>
          <th className='px-6 py-3'>Size</th>
          <th className='px-6 py-3'>Last Modified</th>
          <th className='px-6 py-3'>Shared With</th>
          <th className='px-6 py-3'>Action</th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
      </tbody>
    </table>
  );
};

export default UserTable;
