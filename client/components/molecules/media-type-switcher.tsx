import React from 'react';
import {
  BsImageFill,
  BsFillCameraVideoFill,
  BsFillFilePdfFill,
  BsFileZipFill,
} from 'react-icons/bs';
import { MdAudiotrack } from 'react-icons/md';
import { SiBlender } from 'react-icons/si';
import {
  SiMicrosoftword,
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftaccess,
  SiMicrosoftonenote,
} from 'react-icons/si';
import { GoFile } from 'react-icons/go';

const TypeSwitcher = (props: any): JSX.Element => {
  switch (props.extension) {
    case 'png':
    case 'svg':
      return <BsImageFill className={props.class} />;

    case 'mp4':
    case 'swf':
    case 'mkv':
    case 'flv':
    case 'vob':
    case 'avi':
    case 'ogg':
    case 'mpeg':
    case 'rm':
    case '3gp':
    case 'm4v':
    case '3g2':
    case 'mov':
    case 'mpg':
    case 'asf':
    case 'wmv':
    case 'webm':
      return <BsFillCameraVideoFill className={props.class} />;

    case 'mp3':
    case 'wma':
    case 'm4a':
      return <MdAudiotrack className={props.class} />;

    case 'pdf':
      return <BsFillFilePdfFill className={props.class} />;

    case 'zip':
    case 'rar':
      return <BsFileZipFill className={props.class} />;

    case 'blender':
      return <SiBlender className={props.class} />;

    case 'docx':
    case 'doc':
    case 'dot':
    case 'dotx':
    case 'docm':
    case 'dotm':
      return <SiMicrosoftword className={props.class} />;

    case 'xls':
    case 'xlsx':
    case 'xlt':
    case 'xltx':
    case 'xlsm':
    case 'xlam':
      return <SiMicrosoftexcel className={props.class} />;

    case 'ppt':
    case 'pptx':
    case 'pot':
    case 'potx':
    case 'pptm':
    case 'potm':
      return <SiMicrosoftpowerpoint className={props.class} />;

    case 'mdb':
    case 'accdb':
    case 'accde':
      return <SiMicrosoftaccess className={props.class} />;

    case 'one':
      return <SiMicrosoftonenote className={props.class} />;

    default:
      return <GoFile className={props.class} />;
  }
};

export default TypeSwitcher;
