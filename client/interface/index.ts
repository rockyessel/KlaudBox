import { ParsedUrlQuery } from 'querystring';

export interface GuestFileModelProps {
  url: string;
  size: number;
  identifier: string;
  originalFilename: string;
  mimeType: string;
  extension: string;
  cms_id: string;
  createdAt: string;
  updatedAt: string;
  uploadId: string;
  delete_after: string;
  title: string;
  description: string;
  secure: string;
}

export interface GuestFileProps {
  file: GuestFileModelProps;
  success?: boolean;
}

export interface AllGuestFileProps {
  all_file: GuestFileModelProps[];
  success?: boolean;
}

export interface SelectedFileProps {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface Params extends ParsedUrlQuery {
  file: string;
}

export interface InitialModalFormDataProps {
  title: string;
  description: string;
  secure: string;
  delete_after: string;
}

export interface FormErrorProps {
  state: boolean;
  msg: string;
}

export interface AuthStateProps {
  isLoading: boolean;
  user: null;
  error: string;
  success: boolean;
}

export interface UserFilesProps {
  user: string;
  url: string;
  size: number;
  identifier: string;
  originalFilename: string;
  mimeType: string;
  extension: string;
  tags: string;
  path: string;
  delete_after: string;
  title: string;
  description: string;
  secure: string;
}
interface APIC {
  data: {
    format: string;
    type: string;
    description: string;
    data: number[];
  };
  description: string;
  id: string;
  size: number;
}

interface COMM {
  data: {
    language: string;
    short_description: string;
    text: string;
  };
  description: string;
  id: string;
  size: number;
}

interface TALB {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TCOM {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TCON {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TENC {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TIT2 {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TOPE {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TPE1 {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TYER {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface Comment {
  language: string;
  short_description: string;
  text: string;
}

interface Picture {
  data: number[];
  description: string;
  format: string;
  type: string;
}

interface PictureType {
  data: Uint8Array;
  format: string;
}

export interface Metadata {
  album: string;
  artist: string;
  comment: Comment;
  genre: string;
  title: string;
  year: string;
  picture?: PictureType | undefined;
  APIC?: APIC;
  COMM?: COMM;
  TALB?: TALB;
  TCOM?: TCOM;
  TCON?: TCON;
  TENC?: TENC;
  TIT2?: TIT2;
  TOPE?: TOPE;
  TPE1?: TPE1;
  TYER?: TYER;
}
