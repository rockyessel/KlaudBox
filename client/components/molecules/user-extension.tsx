import React from 'react';
import AudioPlayer from '../atoms/audio-player';
import { UserFilesProps } from '@/interface';
import VideoCard from '../atoms/video-card';
import ImageCard from '../atoms/image-card';
import ApplicationCard from '../atoms/application-card';
import FileExtensionSwitcher from './file-extension-switcher';
import FilesCard from '../atoms/files-card';

const UserExtension = ({ file }: { file: UserFilesProps }) => {
  const name = 'application/octet-stream';

  switch (file.mimeType) {
    case `audio/${file.mimeType.split('/').pop()?.toLocaleLowerCase()}`:
      return <AudioPlayer url={file} />;

    case `image/${file.extension.toLocaleLowerCase()}`:
    case `image/jpeg`:
    case `image/png`:
      return <ImageCard image={file} />;

    case `video/${file.extension}`:
    case `video/x-ms-wmv`:
      return <VideoCard video={file} />;

    case 'application/x-msdownload':
    case 'application/x-executable':
    case 'application/octet-stream':
    case 'application/x-apple-diskimage':
    case 'application/vnd.microsoft.portable-executable':
    case 'application/x-shockwave-flash':
    case 'application/x-java-archive':
    case 'application/x-ms-installer':
    case 'application/x-redhat-package-manager':
    case 'application/x-debian-package':
    case 'application/x-sharedlib':
    case 'application/x-object':
    case 'application/x-desktop':
    case 'application/x-dosexec':
    case 'application/x-msdos-program':
    case 'application/x-ms-shortcut':
    case 'application/x-iso9660-image':
    case 'application/x-ms-application':
    case 'application/x-ole-storage':
    case 'application/x-msclip':
    case 'application/x-winexe':
    case 'application/x-x509-ca-cert':
    case 'application/x-xpinstall':
    case 'application/vnd.android.package-archive':
    case 'application/vnd.apple.pkpass':
    case 'application/x-itunes-ipa':
      return <ApplicationCard file={file} />;

    default:
      return <FilesCard file={file} />;
  }
};

export default UserExtension;
