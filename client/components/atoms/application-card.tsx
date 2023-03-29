import { UserFilesProps } from '@/interface';
import React from 'react';
import { AiFillAppstore } from 'react-icons/ai';

const ApplicationCard = ({ file }: { file: UserFilesProps }) => {
  const mimeType = [
    'application/x-msdownload',
    'application/x-executable',
    'application/octet-stream',
    'application/x-apple-diskimage',
    'application/vnd.microsoft.portable-executable',
    'application/x-shockwave-flash',
    'application/x-java-archive',
    'application/x-ms-installer',
    'application/x-redhat-package-manager',
    'application/x-debian-package',
    'application/x-sharedlib',
    'application/x-object',
    'application/x-desktop',
    'application/x-dosexec',
    'application/x-msdos-program',
    'application/x-ms-shortcut',
    'application/x-iso9660-image',
    'application/x-ms-application',
    'application/x-ole-storage',
    'application/x-msclip',
    'application/x-winexe',
    'application/x-x509-ca-cert',
    'application/x-xpinstall',
    'application/vnd.android.package-archive',
    'application/vnd.apple.pkpass',
    'application/x-itunes-ipa',
    'application/octet-stream',
  ];

  const applicationExtension = [
    'exe',
    'dmg',
    'deb',
    'jar',
    'apk',
    'ipa',
    'xap',
  ];

  const TITLE_MAX = 25;

  const fileName =
    file.originalFilename?.length > TITLE_MAX
      ? `${file.originalFilename.slice(0, TITLE_MAX)}...`
      : file.originalFilename;

  const applications =
    mimeType.includes(`${file?.mimeType}`) &&
    applicationExtension.includes(file.extension);

  return applications ? (
    <div className=' flex flex-col justify-center items-center gap-3 relative my-1'>
      <AiFillAppstore className='text-[10rem]w-full md:w-[12rem] h-full md:h-[12rem] bg-gray-100 rounded-sm shadow-lg p-10' />
      <p className='text-sm text-center font-semibold'>{fileName}</p>
      <span className='absolute top-1 left-1'>
        <input title='checkbox' type='checkbox' className='checkbox' />
      </span>
    </div>
  ) : null;
};

export default ApplicationCard;
