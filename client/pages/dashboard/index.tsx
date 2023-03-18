import { DashboardNavbar, DisplayView, Sidebar, UserModal } from '@/components';
import React from 'react';
import { useUserContext } from '@/context/user-context';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { useRouter } from 'next/router';
import { reset } from '@/reduxtoolkit/features/files/files-slice';

const Dashboard = () => {
  const { modalState } = useUserContext();

  const { user, success, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const { section } = router.query;

  React.useEffect(() => {
    if (user) {
      return
    }

    console.log(section);

    if (user === null) {
      router.push('/login');
    }

    dispatch(reset());
  }, [dispatch, router, success, user, section]);

  return (
    <React.Fragment>
      {modalState && <UserModal />}
      <main id='dashboard' className='w-full h-[100vh] overflow-hidden'>
        <DashboardNavbar />
        <div className='flex'>
          <div className='h-[100vh] overflow-hidden xl:overflow-y-auto border-r-2 border-gray-100 xl:border-r-[1px]'>
            <Sidebar />
          </div>
          <div className='flex overflow-auto h-[88vh] flex-1 w-full'>
            <DisplayView />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
