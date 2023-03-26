import React from 'react';
import { FileType, Folder, TableRow, UserTable } from '../index';

const Recent = () => {
  return (
    <main className='w-full p-5 flex flex-col gap-5'>
      <section className='flex flex-col gap-2'>
        <p>Recently created folders</p>
        <section className='flex flex-wrap items-center gap-2'>
          <Folder />
          <Folder />
          <Folder />
          <Folder />
          <Folder />
          <Folder />
          <Folder />
        </section>
      </section>

      <section className='flex flex-col gap-2'>
        <p>Recently added types</p>
        <section className='flex items-center flex-wrap gap-2'>
          <FileType name='Picture' />
          <FileType name='Video' />
          <FileType name='Music' />
          <FileType name='Application' />
          <FileType name='Files' />
        </section>
      </section>

      <section>
        <div>
          <div className='overflow-x-auto shadow-md sm:rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <p>Recent file uploads</p>
              <p>10/230 files</p>
            </div>
            <UserTable />
            <nav className='flex items-center justify-between p-4'>
              <span className='text-sm font-normal text-gray-500'>
                Showing
                <span className='font-semibold text-gray-900'> 1-5</span> of
                <span className='font-semibold text-gray-900'> 1000</span>
              </span>
              <ul className='inline-flex items-center -space-x-px'>
                <li className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'>
                  Previous
                  <span className='sr-only'>Previous</span>
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  1
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  2
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  3
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  ...
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  100
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  <span className='sr-only'>Next</span>
                  Next
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div className='overflow-x-auto shadow-md sm:rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <p>Recently deleted files</p>
              <p>
                Status: <span>Permanently deleted</span>
              </p>
            </div>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 bg-gray-50'>
                <tr>
                  <th className='p-4'>
                    <input
                      title='checkbox'
                      type='checkbox'
                      className='checkbox'
                    />
                    <label className='sr-only'>checkbox</label>
                  </th>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Size</th>
                  <th className='px-6 py-3'>Deleted on</th>
                  <th className='px-6 py-3'>Shared With</th>
                  <th className='px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <nav className='flex items-center justify-between p-4'>
              <span className='text-sm font-normal text-gray-500'>
                Showing
                <span className='font-semibold text-gray-900'> 1-5</span> of
                <span className='font-semibold text-gray-900'> 1000</span>
              </span>
              <ul className='inline-flex items-center -space-x-px'>
                <li className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'>
                  Previous
                  <span className='sr-only'>Previous</span>
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  1
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  2
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  3
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  ...
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  100
                </li>
                <li className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                  <span className='sr-only'>Next</span>
                  Next
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Recent;
