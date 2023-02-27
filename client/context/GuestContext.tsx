import { GuestFileModelProps } from '@/interface';
import { SelectedFileProps } from '@/interface';
import { GuestFileUploadPost } from '@/utils/api-request';
import { isEqual } from '@/utils/functions';
// import { isEqual } from 'date-fns';
import React, { ChangeEvent } from 'react';

interface GuestContextProps {
  localCollection: GuestFileModelProps[];
  code: string;
  viewOption: string;
  selectedOption: string;
  fileLength: number;
  progress: number;
  modalState: boolean;
  viewOptionState: boolean;
  setViewOptionState: React.Dispatch<React.SetStateAction<boolean>>;
  setViewOption: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleSubmission: (event: React.SyntheticEvent) => Promise<void>;
  fileUpdates: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuestContext = React.createContext<GuestContextProps>({
  localCollection: [],
  code: '',
  viewOption: '',
  selectedOption: '',
  fileLength: 0,
  progress: 0,
  modalState: false,
  viewOptionState: false,
  setViewOptionState: () => false,
  setViewOption: () => 'List',
  setModalState: () => false,
  handleClose: () => {},
  handleSubmission: (event: React.SyntheticEvent) => Promise.resolve(),
  fileUpdates: (event: React.ChangeEvent<HTMLInputElement>) => {},
});

type Props = {
  children: React.ReactNode;
};

export const GuestContextProvider = ({ children }: Props) => {
  // @desc Upload-File
  const [option] = React.useState<string>((): string => {
    if (typeof window !== 'undefined') {
      const view = window.localStorage.getItem('viewOption');
      if (view === null || view === undefined) {
        return 'List';
      }
      return `${view}` ? view : 'No view';
    }
    return '';
  });
  const [viewOption, setViewOption] = React.useState<string>(option);
  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [fileLength, setFileLength] = React.useState<number>(0);
  const [modalState, setModalState] = React.useState(false);
  const [viewOptionState, setViewOptionState] = React.useState(false);

  // @desc Find-File
  const [code, setCode] = React.useState('');

  // @desc Modal
  const [file, setFile] = React.useState<File | ''>('');
  const [progress, setProgress] = React.useState(100);
  const [getFile, setGetFile] = React.useState<any>({});
  const [localCollection, setLocalCollection] = React.useState<any>(() => {
    if (typeof window !== 'undefined') {
      const user_files = window.localStorage.getItem('guestCollection');
      const files = !user_files ? [] : JSON?.parse(`${user_files}`);
      if (files === null || files === undefined) {
        return [];
      }
      return files ? files : null;
    }
    return [];
  });

  if (!isEqual) {
  }

  // @desc useEffects Zone
  React.useEffect(() => {
    window.localStorage.setItem('viewOption', viewOption);

    setSelectedOption(viewOption);
  }, [option, viewOption]);

  const memoizedLocalCollection = React.useMemo(() => {
    return localCollection;
  }, [localCollection]);

  React.useEffect(() => {
    window.localStorage.setItem(
      'guestCollection',
      JSON.stringify(localCollection)
    );

    setFileLength(localCollection?.length);
  }, [memoizedLocalCollection]);
  // End of useEffects

  // @desc Functions
  const fileUpdates = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    console.log(files);
    const selectedFile: any = files as FileList;
    setFile(selectedFile?.[0]);
  };

  const handleClose = () => {
    setModalState((prevState: boolean) => !prevState);
  };

  const handleSubmission = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    try {
      event.preventDefault();

      const data = new FormData();

      data.set('file', file);

      const data_ = await GuestFileUploadPost(data, setProgress);

      const new_localCollection = [...localCollection, data_.file];
      setLocalCollection(new_localCollection);

      setGetFile(data_);
      setModalState(false);
      console.log('getFile in', getFile);
    } catch (error) {
      console.log(error);
    }
  };
  // End of Functions Zone

  const value = {
    // @desc Find-File
    code,
    // @desc Upload-File
    modalState,
    setModalState,
    viewOption,
    fileLength,
    setViewOption,
    setViewOptionState,
    viewOptionState,
    selectedOption,
    progress,
    localCollection,
    // @desc Functions
    handleClose,
    handleSubmission,
    fileUpdates,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export const getStaticProps = async () => {};
export const getInitialProps = async () => {};

export const useGuestContext = () => React.useContext(GuestContext);

//  const [selected, setSelected] = React.useState<string>();
//  const [viewOption, setViewOption] = React.useState<string>(() => {
//    const myCookieValue = Cookies.get('myCookie');
//    return myCookieValue ? myCookieValue.replaceAll('"', '') : 'List';
//  });
//  const [fileLength, setFileLength] = React.useState<number>(0);
//  const [modalState, setModalState] = React.useState(false);
//  const [viewOptionState, setViewOptionState] = React.useState(false);//

//  // @desc Find-File
//  const [code, setCode] = React.useState('');//

//  const handleClose = () => {
//    setModalState((prevState: boolean) => !prevState);
//  };//

//  React.useEffect(() => {
//    if (typeof window !== 'undefined') {
//      Cookies.set('myCookie', JSON.stringify(viewOption));
//    }//

//    setSelected(viewOption);
//  }, [viewOption]);
