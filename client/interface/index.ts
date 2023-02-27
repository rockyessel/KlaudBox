export interface GuestFileModelProps {
  url: string;
  size: string;
  identifier: string;
  originalFilename: string;
  mimeType: string;
  extension: string;
  cms_id: string;
  createdAt: string;
  updatedAt: string;
  uploadId: string;
  daysBeforeDelete: string;
  title: string;
  description: string;
  isPublic: string;
}

export interface SelectedFileProps {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
