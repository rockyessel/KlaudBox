import React from 'react';
import Cookies from 'js-cookie';

interface GuestContextProps {
  code: string;
  viewOption: string;
  fileLength: number;
  modalState: boolean;
  viewOptionState: boolean;
  setViewOptionState: React.Dispatch<React.SetStateAction<boolean>>;
  setViewOption: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const GuestContext = React.createContext<GuestContextProps>({
  code: '',
  viewOption: '',
  fileLength: 0,
  modalState: false,
  viewOptionState: false,
  setViewOptionState: () => false,
  setViewOption: () => 'List',
  setModalState: () => false,
  handleClose: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GuestContextProvider = ({ children }: Props) => {
  // @desc Upload-File
  const [viewOption, setViewOption] = React.useState<string>(() => {
    const myCookieValue = Cookies.get('myCookie');
    return myCookieValue ? myCookieValue.replaceAll('"', '') : 'List';
  });
  const [fileLength, setFileLength] = React.useState<number>(0);
  const [modalState, setModalState] = React.useState(false);
  const [viewOptionState, setViewOptionState] = React.useState(false);

  // @desc Find-File
  const [code, setCode] = React.useState('');

  const handleClose = () => {
    setModalState((prevState: boolean) => !prevState);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      Cookies.set('myCookie', JSON.stringify(viewOption), { expires: 7 });
    }
  }, [viewOption]);

  const value = {
    // @desc Find-File
    code,
    // @desc Upload-File
    modalState,
    setModalState,
    handleClose,
    viewOption,
    fileLength,
    setViewOption,
    setViewOptionState,
    viewOptionState,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export const getInitialProps = async () => {};

export const useGuestContext = () => React.useContext(GuestContext);
  // const [op, setOp] = React.useState((): string => {
  //   if (typeof window !== 'undefined') {
  //     const view = window.localStorage.getItem('viewOption');
  //     console.log('view', view);
  //     if (view === null || view === undefined) {
  //       // we set it to default
  //       return 'List';
  //     }
  //     // we return view
  //     return `${view}` ? view : 'List';
  //   }
  //   return '';
  // });