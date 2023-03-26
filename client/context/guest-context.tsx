import { GuestFileModelProps, InitialModalFormDataProps } from '@/interface';
import { DeleteGuestFile, GuestFileUploadPost } from '@/utils/api-request';
import { isEqual } from '@/utils/functions';
import { InitialModalFormData } from '@/utils/initial-values';
import React, { ChangeEvent } from 'react';

export interface GuestContextProps {
  localCollection: GuestFileModelProps[];
  modalFormData: InitialModalFormDataProps;
  viewOption: string;
  file: string | File;
  selectedOption: string;
  fileLength: number;
  progress: number;
  modalState: boolean;
  isFileUploaded: boolean;
  viewOptionState: boolean;
  loadingState: boolean;
  setLocalCollection: React.Dispatch<
    React.SetStateAction<GuestFileModelProps[]>
  >;
  setViewOptionState: React.Dispatch<React.SetStateAction<boolean>>;
  setViewOption: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFormData: React.Dispatch<
    React.SetStateAction<InitialModalFormDataProps>
  >;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleDeleteFile: (identifier: string) => void;
  handleSubmission: (event: React.SyntheticEvent) => Promise<void>;
  fileUpdates: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuestContext = React.createContext<GuestContextProps>({
  localCollection: [],
  modalFormData: InitialModalFormData,
  file: '',
  viewOption: '',
  selectedOption: '',
  fileLength: 0,
  progress: 0,
  modalState: false,
  viewOptionState: false,
  isFileUploaded: false,
  loadingState: false,
  setModalFormData: () => {},
  setLocalCollection: () => {},
  setViewOptionState: () => false,
  setLoadingState: () => false,
  setViewOption: () => 'List',
  setModalState: () => false,
  handleClose: () => {},
  handleDeleteFile: () => {},
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
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [viewOptionState, setViewOptionState] = React.useState(false);
  const [isFileUploaded, setIsFileUploaded] = React.useState<boolean>(false);
  const [modalFormData, setModalFormData] =
    React.useState<InitialModalFormDataProps>(InitialModalFormData);

  const [loadingState, setLoadingState] = React.useState<boolean>(false);

  // @desc Modal
  const [file, setFile] = React.useState<string | File>('');
  const [progress, setProgress] = React.useState(0);
  const [getFile, setGetFile] = React.useState<any>({});
  const [localCollection, setLocalCollection] = React.useState<
    GuestFileModelProps[]
  >(() => {
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
    const file = event.target.files ? event.target.files[0] : '';
    setFile(file);
  };

  const handleClose = () => {
    setModalState((prevState) => !prevState);
    setFile('');
  };

  const handleDeleteFile = async (identifier: string) => {
    if (identifier === '' || !identifier) return;

    await DeleteGuestFile(identifier);

    const new_localCollection = localCollection.filter(
      (file) => file.identifier !== identifier
    );

    setLocalCollection(new_localCollection);
  };

  const handleSubmission = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    try {
      event.preventDefault();

      if (
        modalFormData === InitialModalFormData ||
        !modalFormData ||
        modalFormData === null ||
        modalFormData === undefined
      )
        return;

      const { title, description, delete_after, secure } = modalFormData;

      if (!title || !description || !delete_after || !secure) return;

      const data = new FormData();
      // eslint-disable-next-line no-undef
      data.append('file', file);
      data.append('title', modalFormData.title);
      data.append('description', modalFormData.description);
      data.append('secure', modalFormData.secure);
      data.append('delete_after', modalFormData.delete_after);

      const data_ = await GuestFileUploadPost(data, setProgress);

      if (data_.success) {
        setIsFileUploaded(true);
        setTimeout(() => {
          setIsFileUploaded(false);
        }, 5000);
      }

      const new_localCollection = [...localCollection, data_.file];
      setLocalCollection(new_localCollection);

      setGetFile(data_);
      setModalState(false);
      setFile('');
      setProgress(0);
      setModalFormData(InitialModalFormData);
    } catch (error) {
      console.log(error);
    }
  };
  // End of Functions Zone

  const value = {
    // @desc Upload-File
    modalState,
    loadingState,
    setModalState,
    viewOption,
    fileLength,
    file,
    setViewOption,
    setViewOptionState,
    setLoadingState,
    setModalFormData,
    viewOptionState,
    selectedOption,
    progress,
    isFileUploaded,
    localCollection,
    setLocalCollection,
    // @desc Functions
    handleClose,
    modalFormData,
    handleSubmission,
    fileUpdates,
    handleDeleteFile,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export const getStaticProps = async () => {};
export const getInitialProps = async () => {};

export const useGuestContext = () => React.useContext(GuestContext);
