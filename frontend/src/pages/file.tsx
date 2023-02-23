import React from 'react';
import { guestFileDownload } from '../utils/api';
import { TypeSwitcher } from '../components';
import { AiOutlineBarcode } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const FileDetails = () => {
  const [allFiles, setAllFiles] = React.useState<any>({});
  const [downloadState, setDownloadState] = React.useState(false);
  const [code, setCode] = React.useState('');
  console.log(allFiles);

  const memoizedAllFiles = React.useMemo(() => allFiles, [allFiles]);

  React.useEffect(() => {
    if (code) {
      guestFileDownload(code).then((data) => setAllFiles(data));
    }
  }, [code]);

  React.useEffect(() => {
    if (memoizedAllFiles?.success === true) {
      setDownloadState(true);
    } else {
      setDownloadState(false);
    }
  }, [memoizedAllFiles]);

  return (
    <div className='bg-[#212121] text-white h-screen px-6 xl:px-60 pt-5 flex flex-col gap-5'>
      <div className='w-full p-6 bg-[#2c2c2c] rounded-lg flex gap-16'>
        <div>
          <span className='text-xl font-bold'>Loads-of-the-rings.mp4</span>
          <div>
            <TypeSwitcher class={`text-[15rem]`} extension={`png`} />
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          <div className='grid grid-cols-6 gap-5'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Type</span>
              <span className='text-gray-300 text-sm font-medium'>
                Google Docs
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Size</span>
              <span className='text-gray-300 text-sm font-medium'>34.3GB</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Owner ID</span>
              <span className='text-gray-300 text-sm font-medium'>JSDJ2</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Date Uploaded</span>
              <span className='text-gray-300 text-sm font-medium'>
                Dec 9, 2022
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Deletion Date</span>
              <span className='text-gray-300 text-sm font-medium'>
                Dec 10, 2022
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Download</span>
              <span className='text-gray-300 text-sm font-medium'>Here</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Privacy</span>
              <span className='text-gray-300 text-sm font-medium'>Private</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Extension</span>
              <span className='text-gray-300 text-sm font-medium'>mp4</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Share link</span>
              <span className='text-gray-300 text-sm font-medium'>mp4</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>File Source</span>
              <span className='text-gray-300 text-sm font-medium'>
                Windows 11 Pro
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <span>No title</span>
            <span className='max-w-lg'>No description</span>
          </div>
        </div>
      </div>

      <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex gap-16'>
        <div className='bg-white flex items-center px-4 py-2 w-[20rem] rounded-lg text-black hover:ring-2 hover:ring-gray-500'>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            title='code'
            type='text'
            name='code'
            id='code'
            placeholder='JSDJ2'
            className='outline-none w-full h-full font-semibold'
          />
          {downloadState ? (
            <BsFillCheckCircleFill className='text-3xl' />
          ) : (
            <AiOutlineBarcode className='text-3xl' />
          )}
        </div>
      </section>
    </div>
  );
};

export default FileDetails;

// <section className='w-full bg-zinc-900 p-10 flex rounded-lg flex-col gap-10'>
//   <div className='flex w-full items-center'>
//     {/* Sub Navbar */}
//     <nav className='w-full flex items-center justify-between'>
//       <ul className='flex items-center gap-4 font-medium'>
//         <li
//           onClick={() => setShowDropdown((previous) => !previous)}
//           className='w-auto relative cursor-pointer'
//         >
//           <span className='inline-flex items-center gap-1'>
//             Secure
//             {showDropdownValue === '' ? null : showDropdownValue ===
//               'Public' ? (
//               <MdPublic />
//             ) : (
//               <MdVpnLock />
//             )}
//             <RiArrowDownSFill
//               className={`${showDropdown ? 'rotate-180' : ''}`}
//             />
//           </span>

//           {showDropdown && (
//             <ul className='bg-[#2c2c2c] absolute px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>
//               <li
//                 onClick={() => setShowDropdownValue('Public')}
//                 className='w-full inline-flex items-center gap-2 py-1 px-2'
//               >
//                 Public <MdPublic />{' '}
//               </li>
//               <li
//                 onClick={() => setShowDropdownValue('Private')}
//                 className='w-full inline-flex items-center gap-2 py-1 px-2'
//               >
//                 Private <MdVpnLock />{' '}
//               </li>
//             </ul>
//           )}
//         </li>

//         <li
//           onClick={() => setDeleteAfterState((previous) => !previous)}
//           className='w-auto relative cursor-pointer'
//         >
//           <span className='inline-flex items-center gap-1'>
//             Delete after:{` `}
//             {deleteAfter === '0'
//               ? null
//               : deleteAfter === '1'
//               ? '1 day'
//               : `${deleteAfter} days`}
//             <RiArrowDownSFill
//               className={`${showDropdown ? 'rotate-180' : ''}`}
//             />
//           </span>

//           {deleteAfterState && (
//             <ul className='bg-[#2c2c2c] absolute right-5 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>
//               <li
//                 onClick={() => setDeleteAfter('1')}
//                 className='w-full inline-flex items-center gap-2 py-1 px-2'
//               >
//                 1
//               </li>
//               <li
//                 onClick={() => setDeleteAfter('2')}
//                 className='w-full inline-flex items-center gap-2 py-1 px-2'
//               >
//                 2
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>

//       <ul className='flex items-center gap-2 cursor-pointer'>
//         <li className='bg-green-700 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'>
//           Upload another file
//         </li>

//         <li
//           onClick={() => window.location.reload()}
//           className='bg-black text-center rounded text-white text-md font-medium px-4 py-2 outline-none'
//         >
//           Refresh Page
//         </li>

//         {showDropdownValue === 'Public' && (
//           <li className='bg-blue-600 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'>
//             Share File
//           </li>
//         )}
//         <li className='bg-red-700 text-center rounded text-white text-md font-medium px-4 py-2 outline-none'>
//           Delete
//         </li>
//       </ul>
//     </nav>
//   </div>
// </section>
