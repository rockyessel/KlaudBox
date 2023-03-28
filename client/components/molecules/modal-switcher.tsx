import React from 'react';
import UserModal from './user-modal';
import SearchModal from './search-modal';
import { useUserContext } from '@/context/user-context';

interface Props {}

const ModalSwitcher = ({ modalType }: { modalType: string }):JSX.Element => {

      const { modalState } = useUserContext();

  switch (modalType) {
    case 'user-modal':
     return <>{modalState && <UserModal />}</>;
    

    case 'search-modal':
      return <>{modalState && <SearchModal />}</>
      

    case 'settings-modal':
       return <p>Settings</p>

    default:
      return  <p className='hidden'>Default</p>
  }
};

export default ModalSwitcher;
