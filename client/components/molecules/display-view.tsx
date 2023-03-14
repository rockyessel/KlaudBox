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

const DisplayView = () => {
  const [image, setImage] = React.useState([]);
  const { section } = useRouter().query;
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, files } = useSelector(
    (state: RootState) => state.files
  );

  console.log('files', files);
  const audioFilter: UserFilesProps[] = files?.filter(
    (file: any) => file?.mimeType?.split('/')[0] === 'audio'
  );
  const imageFilter: UserFilesProps[] = files?.filter(
    (file: any) => file?.mimeType?.split('/')[0] === 'image'
  );
  const videoFilter: UserFilesProps[] = files?.filter(
    (file: any) => file?.mimeType?.split('/')[0] === 'video'
  );

  React.useEffect(() => {
    if (isError) console.log('Error');
    if (!user) router.push('/accounts/login');
  }, [isError, router, user, isSuccess]);

  React.useEffect(() => {
    dispatch(get_all_files(user?.token));
  }, [dispatch, user?.token]);

  // if (isLoading) {
  //   return <p>Loafing</p>;
  // }

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

export const getStaticProps = async () => {
  
}