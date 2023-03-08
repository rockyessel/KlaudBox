import { DashboardNavbar, DisplayView, Sidebar, UserModal } from '@/components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_files } from '@/reduxtoolkit/features/files/files-request';
import type { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, files } = useSelector(
    (state: RootState) => state.files
  );
  const router = useRouter();

  console.log('files', files);

  React.useEffect(() => {
    if (isError) console.log('Error');

    if (!user) router.push('/accounts/login');

    dispatch(get_all_files(user.token));
  }, [dispatch, isError, router, user]);

  return (
    <React.Fragment>
      <UserModal />
      <main id='dashboard' className='w-full h-[100vh] overflow-hidden'>
        <DashboardNavbar />
        <div className='flex'>
          <div className='h-[92vh] overflow-hidden xl:overflow-y-auto border-r-2 border-gray-100 xl:border-r-[1px]'>
            <Sidebar />
          </div>
          <div className='flex overflow-auto h-[88vh] flex-1'>
            <DisplayView />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
