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
import { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { UserFilesProps } from '@/interface';
import AllFiles from '../organisms/all-files';

const DisplayView = () => {
  const [fileCaching, setFileCaching] = React.useState<UserFilesProps[]>([]);
  const { section } = useRouter().query;
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, files } = useSelector(
    (state: RootState) => state.files
  );

  const applicationExtension = [
    'exe',
    'dmg',
    'deb',
    'jar',
    'apk',
    'ipa',
    'xap',
  ];

  const audioFilter: UserFilesProps[] = fileCaching
    ? fileCaching?.filter(
        (file: any) => file?.mimeType?.split('/')[0] === 'audio'
      )
    : files?.filter((file: any) => file?.mimeType?.split('/')[0] === 'audio');

  const imageFilter: UserFilesProps[] = fileCaching
    ? fileCaching?.filter(
        (file: any) => file?.mimeType?.split('/')[0] === 'image'
      )
    : files?.filter((file: any) => file?.mimeType?.split('/')[0] === 'image');

  const videoFilter: UserFilesProps[] = fileCaching
    ? fileCaching?.filter(
        (file: any) => file?.mimeType?.split('/')[0] === 'video'
      )
    : files?.filter((file: any) => file?.mimeType?.split('/')[0] === 'video');

  const applicationFilter: UserFilesProps[] = fileCaching
    ? fileCaching.filter((file) =>
        applicationExtension.some((ext) => file.extension.includes(ext))
      )
    : files.filter((file) =>
        applicationExtension.some((ext) => file.extension.includes(ext))
      );

  React.useEffect(() => {
    if (isError) console.log('Error');
    if (!user) router.push('/accounts/login');
  }, [isError, router, user, isSuccess]);

  React.useEffect(() => {
    const cachedFiles = window.localStorage.getItem('cachingUserFiles');

    if (!cachedFiles) {
      dispatch(get_all_files(user?.token));
    } else {
      setFileCaching(JSON.parse(cachedFiles));
    }
  }, [dispatch, user?.token]);

  // React.useEffect(() => {
  //   if (files && files.length > 0) {
  //     window.localStorage.setItem('cachingUserFiles', JSON.stringify([...files]));
  //   }
  // }, [files]);

  const memoizedFiles = React.useMemo(() => {
    if (files) {
      return files;
    } else {
      return [];
    }
  }, [files]);

  const cached = fileCaching ? fileCaching : files;

  if (isLoading) {
    return <p>Loading</p>;
  }

  switch (section) {
    case 'recent':
      return <Recent />;
    case 'favorites':
      return <Favorites />;
    case 'picture':
      return <Picture imageFilter={imageFilter} />;
    case 'video':
      return <VideoType videoFilter={videoFilter} />;
    case 'music':
      return <Music audioFilter={audioFilter} />;
    case 'application':
      return <Application applicationFilter={applicationFilter} />;
    case 'files':
      return <AllFiles files={cached} />;
    case 'google-drive':
      return <>google-drive</>;
    case 'one-drive':

    default:
      return <h1>404 page</h1>;
  }
};

export default DisplayView;

export const getStaticProps = async () => {};
