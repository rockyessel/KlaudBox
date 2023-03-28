import React from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { FileCardInfo, Main } from '@/components';
import { singleGuestFile } from '@/utils/api-request';
import { GuestFileProps } from '@/interface';
import Loader from '@/components/atoms/loader';
import { MdFindInPage } from 'react-icons/md';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FindFilePage = () => {
  const [code, setCode] = React.useState<string>('');
  const [foundFileState, setFoundFileState] = React.useState(false);
  const [codeError, setCodeError] = React.useState(false);
  const [foundFile, setFoundFile] = React.useState<GuestFileProps>();
  const router = useRouter();

  const privateCode = router.query?.code as string;

  const handleFindFileWithCode = async (event: React.SyntheticEvent) => {
    setCodeError(false);
    event.preventDefault();
    if (!code || code === '') return;
    setFoundFileState(true);
    const found_file = await singleGuestFile(code);
    setFoundFile(found_file);
    console.log(found_file);
    setFoundFileState(false);
    setCode('');
    if (found_file?.response?.status === 404) {
      setCodeError(true);
    }
  };

  React.useEffect(() => {
    privateCode !== '' ? setCode(privateCode) : null;
  }, [privateCode]);

  if (foundFileState) return <Loader />;

  console.log('codeError', codeError);

  return (
    <Main>
      <section className='flex flex-col gap-4'>
        <p className='px-4 py-2 bg-white shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current flex-shrink-0 h-10 w-10 text-rose-800'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>
            You can find access your file from any device with just your file
            code.
          </span>
        </p>
        <p className='px-4 py-2 bg-white shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current flex-shrink-0 h-10 w-10 text-rose-800'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>
            <Link
              className='cursor-pointer hover:underline font-medium text-rose-800'
              href='/accounts/register'
            >
              Register
            </Link>{' '}
            or{' '}
            <Link
              className='cursor-pointer hover:underline font-medium text-rose-800'
              href='/accounts/login'
            >
              Login
            </Link>{' '}
            to view, play, share, download, upload, and access your files
            anywhere in the world.
          </span>
        </p>
      </section>

      <section className='flex justify-center items-center'>
        <form
          onSubmit={handleFindFileWithCode}
          className='ring-[1px] ring-gray-500/30 bg-white flex items-center w-full p-2 rounded-sm text-black font-semibold'
        >
          <input
            title='Code'
            onChange={(event) => setCode(event.target.value)}
            value={code}
            type='text'
            placeholder='Hx@4fjhN'
            className='w-full text-xl outline-none'
          />
          <button
            type='submit'
            title='Find file'
            className='bg-rose-700 text-white rounded-sm w-fit px-4 py-2 inline-flex items-center gap-1 text-xl font-medium'
          >
            <span className='hidden sm:block'>Lookup</span>
            <MdFindInPage />
          </button>
        </form>
      </section>

      {foundFile && foundFile.success && <FileCardInfo data={foundFile} />}
      {codeError && (
        <div className='w-full py-10 flex flex-col gap-5 justify-center items-center p-2 bg-white shadow-lg rounded-sm'>
          <div className='w-[10rem]'>
            <Image src='/3828539.svg' width={1000} height={1000} alt='' />
          </div>
          <p className='text-center'>
            Either the file has reached it expiration date or it does not exist.
            Either way, we could not find the file with the code you provided.
          </p>
        </div>
      )}
    </Main>
  );
};

export default FindFilePage;
// BE123C  className='w-full '
