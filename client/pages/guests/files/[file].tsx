import React from 'react';
import {
  GetAllFiles,
  GuestFileSlug,
  singleGuestFile,
} from '@/utils/api-request';
import { FileCardInfo, Main, MediaSwitcher } from '@/components';
import { AiOutlineBarcode } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { AllGuestFileProps, GuestFileProps, Params } from '@/interface';
import { useGuestContext } from '@/context/GuestContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FileDetails = ({
  file_data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [allFiles, setAllFiles] = React.useState<GuestFileProps>();
  const [downloadState, setDownloadState] = React.useState(true);
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [code, setCode] = React.useState('');
  const memoizedAllFiles = React.useMemo(() => allFiles, [allFiles]);

  const { handleDeleteFile } = useGuestContext();

  React.useEffect(() => {
    if (code) {
      singleGuestFile(code).then((data) => setAllFiles(data));
    }
  }, [code]);

  React.useEffect(() => {
    if (memoizedAllFiles?.success === true) {
      setDownloadState(true);
    } else {
      setDownloadState(false);
    }
  }, [memoizedAllFiles]);

   const router = useRouter();

 if (router.isFallback) return <p>404</p>;
 
  return (
    <Main class={` ${checkboxState ? 'h-full' : 'h-screen'}`}>
      {file_data?.file.secure !== 'private' ? (
        <React.Fragment>
          <FileCardInfo data={file_data} />

          <section className='flex gap-10'>
            <section className='bg-zinc-900 flex rounded-lg items-center justify-center p-6'>
              <div className='flex gap-2 items-center divide-x-[1px] divide-gray-300/60'>
                <p className='text-xl font-medium inline-flex items-center gap-1'>
                  Preview <BsInfoCircleFill />{' '}
                </p>
                <div className='px-3'>
                  <label className='switch'>
                    <input
                      title='preview checkbox'
                      onChange={(event) =>
                        setCheckboxState(event.target.checked)
                      }
                      type='checkbox'
                    />
                    <span className='slider'></span>
                  </label>
                </div>
              </div>
            </section>

            <section className='w-full p-6 bg-[#2c2c2c] rounded-lg flex gap-16'>
              <div className='flex gap-5'>
                <div className='bg-white flex items-center w-[20rem] px-4 py-2 rounded-lg text-black hover:ring-2 hover:ring-gray-500'>
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    title='code'
                    type='text'
                    name='code'
                    id='code'
                    placeholder='JSDJ2'
                    className='outline-none w-full h-full font-semibold'
                  />
                  {downloadState ? (
                    <AiOutlineBarcode className='text-3xl' />
                  ) : (
                    <BsFillCheckCircleFill className='text-3xl text-green-500' />
                  )}
                </div>
                <div className='flex items-center gap-5'>
                  <button
                    disabled={downloadState}
                    className='px-4 py-2 rounded-lg bg-blue-500'
                  >
                    Download
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteFile(`${allFiles?.file?.identifier}`)
                    }
                    className='px-4 py-2 rounded-lg bg-rose-500'
                  >
                    Delete File
                  </button>
                </div>
              </div>
            </section>
          </section>

          {checkboxState && (
            <section className='w-fit p-6 bg-[#2c2c2c] rounded-lg flex gap-2 flex-col'>
              <MediaSwitcher data={file_data} />
            </section>
          )}
        </React.Fragment>
      ) : (
        <Main>
          <p className='text-5xl text-center font-bold'>This is a private</p>
          <p className='text-center'>
            If you have the code to file, then go to{' '}
            <Link href='/guests/find-file'>here.</Link>
          </p>
        </Main>
      )}
    </Main>
  );
};

export default FileDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const file_path_fun: AllGuestFileProps = await GetAllFiles();

  const paths = file_path_fun.all_file.map((path) => ({
    params: {
      file: path.cms_id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  file_data: GuestFileProps;
}> = async (context) => {
  const { file }: any = context.params as Params;

  const file_data: GuestFileProps = await GuestFileSlug(file);

  if (!file_data) return { notFound: true };

  return {
    props: { file_data: JSON.parse(JSON.stringify(file_data)) },
  };
};
