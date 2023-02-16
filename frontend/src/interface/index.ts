export interface GuestFileUploadProps {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface SelectedFileInfoProps {
  name: string;
  size: string;
  type: string
}
