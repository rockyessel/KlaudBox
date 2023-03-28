import { UserFilesProps } from '@/interface';
import { useRouter } from 'next/router';
import React from 'react';

export interface UserContextProps {
  handleChangeRouter: (name: string) => void;
  handleModalType: (type: string) => void;
  handleModalState: () => void;
  selectedRouteState: boolean;
  modalState: boolean;
  showMenu: boolean;
  modalType: string;
  handleMenuState: () => void;
  userFileCashing: UserFilesProps[];
  fileCaching: UserFilesProps[];
  setFileCaching: React.Dispatch<React.SetStateAction<UserFilesProps[]>>;
}

const UserContext = React.createContext<UserContextProps>({
  handleChangeRouter: (name: string) => {},
  handleModalType: (type: string) => {},
  handleModalState: () => {},
  selectedRouteState: false,
  modalState: false,
  showMenu: false,
  modalType: '',
  handleMenuState: () => {},
  userFileCashing: [],
  fileCaching: [],
  setFileCaching: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRouteState, setSelectedRouteState] =
    React.useState<boolean>(false);
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [modalType, setModalType] = React.useState('');
  const [userFileCashing, setUserFileCashing] = React.useState<
    UserFilesProps[]
  >([]);
  const [fileCaching, setFileCaching] = React.useState<UserFilesProps[]>([]);
  console.log('fileCaching', fileCaching);

  const router = useRouter();

  const handleModalState = () => setModalState((prev) => !prev);
  const handleChangeRouter = (name: string) => {
    router.push({ query: { section: `${name}` } }, undefined, {
      shallow: true,
    });
    const { section } = router.query;
    const state: boolean = section === name;
    setSelectedRouteState(state);
  };
  const handleMenuState = () => {
    setShowMenu((previous_state) => !previous_state);
  };

  const handleModalType = (type: string) => {
    setModalState((prev) => !prev);
    setModalType(type);
  };

  const values = {
    handleChangeRouter,
    selectedRouteState,
    modalState,
    handleModalState,
    showMenu,
    handleMenuState,
    userFileCashing,
    handleModalType,
    modalType,
    fileCaching,
    setFileCaching,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => React.useContext(UserContext);
