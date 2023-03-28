import { UserFilesProps } from '@/interface';
import { AppDispatch, RootState } from '@/reduxtoolkit/app/store';
import { get_all_files } from '@/reduxtoolkit/features/files/files-request';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const SearchModal = () => {
  const [filteredWord, setFilteredWord] = React.useState<UserFilesProps[]>([]);
  const [searchData, setSearchData] = React.useState<UserFilesProps[]>([]);
  const [word, setWord] = React.useState('');

    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { isLoading, isError, isSuccess, files } = useSelector(
      (state: RootState) => state.files
    );


    React.useEffect(() => {
      const fetchData = async () => {
         await dispatch(get_all_files(user?.token));
        setSearchData(files);
      };
      fetchData();
    }, [dispatch, files, user?.token]);

      const handleWord = (event: any) => {
        const searchWord = event.target.value.toLowerCase();
        setWord(searchWord);
        const filterWord = searchData.filter((file) => {
          return file?.originalFilename.toLowerCase().includes(searchWord);
        });
        if (searchWord === '') {
          setFilteredWord([]);
        } else {
          setFilteredWord(filterWord);
        }
      };
      const handleClear = () => {
        setWord('');
        setFilteredWord([]);
      };

  return (
    <div
      className={`hidden sm:block w-full bg-slate-500/60 relative px-2 rounded-sm`}
    >
      <div className='flex items-center justify-between'>
        <input
          type='text'
          name='search'
          value={word}
          onChange={handleWord}
          className={`w-full bg-transparent outline-none px-4 py-2`}
          placeholder='Search for movies, tv shows and people...'
        />
        {word.length > 0 ? (
          <FaTimes
            onClick={handleClear}
            className='text-2xl cursor-pointer text-gray-50/20'
          />
        ) : (
          <FaSearch className='text-2xl cursor-pointer text-gray-50/20' />
        )}
      </div>
      {word.length > 0 && filteredWord?.length > 0 && (
        <ul className='bg-slate-500 text-black h-auto absolute top-[3.4rem] w-full right-0 rounded-md z-[10]'>
          {word.length > 0 && filteredWord?.length === 0 ? (
            <li
              className={`flex gap-2 items-center py-1 hover:bg-gray-50/20 w-full rounded px-1 active:bg-blue-400 cursor-pointer`}
            >
              Couldn&apos; find your result
            </li>
          ) : (
            filteredWord?.slice(0, 5)?.map((file, index) => (
              
                <li
                key={index}
                  className={`flex gap-2 files-center py-1 hover:bg-gray-50/20 w-full rounded px-1 active:bg-bg-gray-50/20 hover:text-white cursor-pointer`}
                >
                  {/* <Image
                    width={100}
                    height={100}
                    src={file?.extension}
                    className={`w-14 h-14 rounded-md object-cover object-center`}
                    alt={file?.title}
                  /> */}
                  <div className={` text-sm`}>
                    <span className={`font-bold`}>{file?.title}</span>
                    <p className={`text-sm hidden md:block`}>
                      {file?.description}
                    </p>
                  </div>
                </li>
             
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchModal