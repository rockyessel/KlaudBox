import React from 'react';
import { useRouter } from 'next/router';
import {
  Application,
  Favorites,
  Picture,
  Recent,
  VideoType,
  Music,
} from '../index';
import { get_all_files } from '@/reduxtoolkit/features/files/files-request';
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '@/context/user-context';
import { AppDispatch, RootState } from '@/reduxtoolkit/app/store';

const DisplayView = () => {
  const { section } = useRouter().query;
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, files } = useSelector((state: RootState) => state.files);

  const {files:user_files} = files as any

  const imageFilter = user_files?.filter((file: any) => file?.mimeType?.split('/')[0] === 'image');

  const audioFilter = user_files?.filter((file: any) => file?.mimeType?.split('/')[0] === 'audio');


  React.useEffect(() => {
    if (isError) console.log('Error');
    if (!user) router.push('/accounts/login');
    dispatch(get_all_files(user?.token));
  }, [dispatch, isError, router, user, isSuccess]);

  switch (section) {
    case 'recent':
      return <Recent />;
    case 'favorites':
      return <Favorites />;
    case 'picture':
      return <Picture imageFilter={imageFilter} />;
    case 'video':
      return <VideoType />;
    case 'music':
      return <Music />;
    case 'application':
      return <Application />;
    case 'files':
      return <>files</>;
    case 'google-drive':
      return <>google-drive</>;
    case 'one-drive':

    default:
      return <h1>404 page</h1>;
  }
};

export default DisplayView;
