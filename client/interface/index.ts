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
  file: {
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
  };
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
};