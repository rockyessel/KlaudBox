import React from 'react';
import {
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineLogout,
} from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { BsStar, BsCameraVideo, BsFileSpreadsheet } from 'react-icons/bs';
import { CgMusicNote } from 'react-icons/cg';
import { RiAppsLine, RiDriveLine } from 'react-icons/ri';
import { SiMicrosoftonedrive, SiGoogledrive } from 'react-icons/si';
import { SlSocialDropbox } from 'react-icons/sl';
import { RxImage } from 'react-icons/rx';
import { useUserContext } from '@/context/user-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { useRouter } from 'next/router';
import Loader from './loader';
import { logout } from '@/reduxtoolkit/features/auth/auth-request';
import { reset } from '@/reduxtoolkit/features/files/files-slice';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);
  const { handleChangeRouter } = useUserContext();

  const normalLink = `flex items-center gap-1 hover:bg-gray-500 p-2 justify-center xl:justify-start cursor-pointer font-semibold rounded-sm`;

  const { isLoading, user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    router.pathname === '/dashboard' ? router.push('/accounts/login') : null;
    localStorage.removeItem('cachingUserFiles');
    dispatch(logout());
    dispatch(reset());
    router.replace(router.asPath);
  };

  if (isLoading) return <Loader />;

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

      {showSidebar && (
        <div className='xl:w-[200px] w-20 flex flex-col justify-start mb-10 p-3'>
          <div className='xl:border-b-3 border-gray-200 xl:pb-4 flex flex-col gap-5 divide-y divide-gray-500/20 xl:divide-y-0'>
            <div className='flex flex-col gap-4 text-lg'>
              <p className='font-medium text-xl hidden xl:block'>Explore</p>
              <ul className='flex flex-col gap-1 ml-2'>
                <li
                  onClick={() => handleChangeRouter('files')}
                  title='Files'
                  className={normalLink}
                >
                  <BsFileSpreadsheet className='text-xl' />
                  <span className='hidden xl:block'>All Files</span>
                </li>
                <li
                  onClick={() => handleChangeRouter('favorites')}
                  title='Favorites'
                  className={normalLink}
                >
                  <BsStar className='text-xl' />
                  <span className='hidden xl:block'>Favorites</span>
                </li>
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

            <div className='flex flex-col gap-4 text-lg'>
              <p className='font-medium text-xl hidden xl:block'>Account</p>
              <ul className='flex flex-col gap-1 ml-2'>
                <li
                  onClick={() => handleChangeRouter('settings')}
                  title='Settings'
                  className={normalLink}
                >
                  <AiOutlineSetting className='text-xl' />
                  <span className='hidden xl:block'>Settings</span>
                </li>
                <li
                  onClick={handleLogout}
                  title='Logout'
                  className={normalLink}
                >
                  <AiOutlineLogout className='text-xl' />
                  <span className='hidden xl:block'>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
