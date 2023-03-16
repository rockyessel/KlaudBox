import { UserFilesProps } from '@/interface';
import { useRouter } from 'next/router';
import React from 'react';

export interface UserContextProps {
  handleChangeRouter: (name: string) => void;
  handleModalState: () => void;
  selectedRouteState: boolean;
  modalState: boolean;
  showMenu: boolean;
  handleMenuState: () => void;
  userFileCashing: UserFilesProps[];
}

const UserContext = React.createContext<UserContextProps>({
  handleChangeRouter: (name: string) => {},
  handleModalState: () => {},
  selectedRouteState: false,
  modalState: false,
  showMenu: false,
  handleMenuState: () => {},
  userFileCashing: [],
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
  const [userFileCashing, setUserFileCashing] = React.useState<
    UserFilesProps[]
  >([]);

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

  const values = {
    handleChangeRouter,
    selectedRouteState,
    modalState,
    handleModalState,
    showMenu,
    handleMenuState,
    userFileCashing,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => React.useContext(UserContext);
