import React from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { FileCardInfo, Main, TypeSwitcher } from '@/components';
import { singleGuestFile } from '@/utils/api-request';
import { GuestFileProps } from '@/interface';

const FindFilePage = () => {
  const [code, setCode] = React.useState('');
  const [foundFile, setFoundFile] = React.useState<GuestFileProps>();

  const handleFindFileWithCode = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();

      if (!code || code === '') return;

      const found_file = await singleGuestFile(code);

      setFoundFile(found_file);
      setCode('');

      console.log('foundFile', foundFile);
    } catch (error) {
      console.log(error);
    }
  };

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
          className='bg-white flex items-center w-full p-2 rounded-lg text-black font-semibold focus:ring-2 focus:ring-rose-800 hover:ring-2 hover:ring-rose-500'
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
