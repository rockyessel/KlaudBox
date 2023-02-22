import React from 'react';
import { GetAllFiles } from '../utils/api';

const FileDetails = () => {
  const [allFiles, setAllFiles] = React.useState([]);

  console.log(allFiles);

  React.useEffect(() => {
    GetAllFiles().then((data) => setAllFiles(data));
  }, []);
  return <div className='text-4xl'>FileDetails</div>;
};

export default FileDetails;
