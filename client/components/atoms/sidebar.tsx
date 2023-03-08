import React from 'react';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { BiTimeFive } from 'react-icons/bi';
import { BsStar, BsCameraVideo, BsFileSpreadsheet } from 'react-icons/bs';
import { CgMusicNote } from 'react-icons/cg';
import { RiAppsLine, RiDriveLine } from 'react-icons/ri';
import { SiMicrosoftonedrive, SiGoogledrive } from 'react-icons/si';
import { SlSocialDropbox } from 'react-icons/sl';
import { RxImage } from 'react-icons/rx';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);
  const [selectedRouteState, setSelectedRouteState] =
    React.useState<boolean>(false);

  const router = useRouter();

  const handleChangeRouter = (name: string) => {
    router.push({ query: { section: `${name}` } }, undefined, {
      shallow: true,
    });
    const { section } = router.query;
    const state: boolean = section === name;
    setSelectedRouteState(state);
  };

  const normalLink = `flex items-center gap-1 hover:bg-gray-500 p-2 justify-center xl:justify-start cursor-pointer font-semibold rounded-md`;

  return (
    <section className='flex flex-col gap-2 justify-center w-full'>
      <button
        type='button'
        title='sidebar menu'
        onClick={() => setShowSidebar((prev) => !prev)}
        className='block xl:hidden m-2 ml-4 mt-3 text-xl text-center mx-auto'
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </button>

      <div className='xl:w-[200px] w-20 flex flex-col justify-start mb-10 p-3'>
        <div className='xl:border-b-3 border-gray-200 xl:pb-4 flex flex-col gap-5'>
          <div className='flex flex-col gap-4 text-lg'>
            <p className='font-semibold text-xl hidden xl:block'>
              Explore Folder
            </p>
            <ul className='flex flex-col gap-1 ml-2 font-medium'>
              <li
                onClick={() => handleChangeRouter('recent')}
                title='Recent'
                className={normalLink}
              >
                <BiTimeFive className='text-xl' />
                <span className='hidden xl:block'>Recent</span>
              </li>
              <li
                onClick={() => handleChangeRouter('favorites')}
                title='Favorites'
                className={normalLink}
              >
                <BsStar className='text-xl' />
                <span className='hidden xl:block'>Favorites</span>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-4 text-lg'>
            <p className='font-semibold text-xl hidden xl:block'>Documents</p>
            <ul className='flex flex-col gap-1 ml-2 font-medium'>
              <li
                onClick={() => handleChangeRouter('picture')}
                title='Picture'
                className={normalLink}
              >
                <RxImage className='text-xl' />
                <span className='hidden xl:block'>Picture</span>
              </li>

              <li
                onClick={() => handleChangeRouter('video')}
                title='Video'
                className={normalLink}
              >
                <BsCameraVideo className='text-xl' />
                <span className='hidden xl:block'>Video</span>
              </li>

              <li
                onClick={() => handleChangeRouter('music')}
                title='Music'
                className={normalLink}
              >
                <CgMusicNote className='text-xl' />
                <span className='hidden xl:block'>Music</span>
              </li>

              <li
                onClick={() => handleChangeRouter('application')}
                title='Application'
                className={normalLink}
              >
                <RiAppsLine className='text-xl' />
                <span className='hidden xl:block'>Application</span>
              </li>

              <li
                onClick={() => handleChangeRouter('files')}
                title='Files'
                className={normalLink}
              >
                <BsFileSpreadsheet className='text-xl' />
                <span className='hidden xl:block'>Files</span>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-4 text-lg'>
            <p className='font-semibold text-xl hidden xl:block'>
              Storage disks
            </p>
            <ul className='flex flex-col gap-1 ml-2 font-medium'>
              <li
                onClick={() => handleChangeRouter('google-drive')}
                title='Google Drive'
                className={normalLink}
              >
                <RiDriveLine className='text-xl' />
                <span className='hidden xl:block'>Google Drive</span>
              </li>
              <li
                onClick={() => handleChangeRouter('one-drive')}
                title='OneDrive'
                className={normalLink}
              >
                <SiMicrosoftonedrive className='text-xl' />
                <span className='hidden xl:block'>OneDrive</span>
              </li>
              <li
                onClick={() => handleChangeRouter('dropbox')}
                title='Dropbox'
                className={normalLink}
              >
                <SlSocialDropbox className='text-xl' />
                <span className='hidden xl:block'>Dropbox</span>
              </li>
            </ul>
          </div>

          {/* <div className='flex flex-col gap-4 text-lg'>
            <p className='font-semibold text-xl hidden xl:block'>Organizations</p>
            <ul className='flex flex-col gap-1 ml-2 font-medium'>
              <li
                onClick={() => handleChangeRouter('')}
                title='recent'
                className={normalLink}
              >
                <RiDriveLine className='text-xl' />
                <span className='hidden xl:block'>Google Drive</span>
              </li>
              <li
                onClick={() => handleChangeRouter('')}
                title='recent'
                className={normalLink}
              >
                <SiMicrosoftonedrive className='text-xl' />
                <span className='hidden xl:block'>OneDrive</span>
              </li>
              <li
                onClick={() => handleChangeRouter('')}
                title='recent'
                className={normalLink}
              >
                <SlSocialDropbox className='text-xl' />
                <span className='hidden xl:block'>Dropbox</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
