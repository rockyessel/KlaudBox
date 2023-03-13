import { DashboardNavbar, DisplayView, Sidebar, UserModal } from '@/components';
import React from 'react';
import { useUserContext } from '@/context/user-context';

const Dashboard = () => {
  const { modalState } = useUserContext();

  return (
    <React.Fragment>
      {modalState && <UserModal />}
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
