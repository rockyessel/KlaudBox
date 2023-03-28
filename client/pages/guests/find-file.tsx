import React from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { FileCardInfo, Main } from '@/components';
import { singleGuestFile } from '@/utils/api-request';
import { GuestFileProps } from '@/interface';
import Loader from '@/components/atoms/loader';

const FindFilePage = () => {
  const [code, setCode] = React.useState('');
  const [codeState, setCodeState] = React.useState(false);
  const [foundFile, setFoundFile] = React.useState<GuestFileProps>();

  const handleFindFileWithCode = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      setCodeState(true);

      if (!code || code === '') return;

      const found_file = await singleGuestFile(code);

      setFoundFile(found_file);
      setCode('');
      setCodeState(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (codeState) return <Loader />;

  return (
    <Main>
      <section className='flex flex-col gap-4'>
        <p className='text-5xl text-center font-bold capitalize'>
          KloudBox: Find Files with unique code
        </p>
        <p className='text-lg text-center'>
          Use your generated 5 alphanumeric code to download your file.
        </p>
      </section>

      <section className='flex justify-center items-center'>
        <form
          onSubmit={handleFindFileWithCode}
          className='ring-[1px] ring-gray-500/30 bg-white flex items-center w-full p-2 rounded-lg text-black font-semibold'
        >
          <input
            title='Code'
            onChange={(event) => setCode(event.target.value)}
            value={code}
            type='text'
            className='w-full text-xl outline-none'
          />
          <button title='button' type='submit'>
            <HiPaperAirplane className='text-4xl rounded-lg bg-gray-300/60 p-1 w-12 h-10 text-rose-700 cursor-pointer active:ring-2 active:ring-rose-500' />
          </button>
        </form>
      </section>

      {foundFile && foundFile.success === true ? (
        <FileCardInfo data={foundFile} />
      ) : !foundFile ? null : (
        <p>File has been deleted/ not found</p>
      )}
    </Main>
  );
};

export default FindFilePage;
