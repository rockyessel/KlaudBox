import React, { ChangeEvent } from 'react';

const Home = () => {
  const [file, setFile] = React.useState();
  const [getFile, setGetFile] = React.useState<{ file_url: string }>({
    file_url: '',
  });

  React.useEffect(() => {}, []);

  console.log(file);
  console.log('image url', getFile);

  const fileUpdates = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files as FileList;
    setFile(selectedFile?.[0]);
  };

  const handleSubmission = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const data = new FormData();
      console.log('formData', data);

      data.append('file', file);

      const response = await fetch('http://localhost:7000/v1/guest', {
        method: 'POST',
        body: data,
      });

      const response_data = await response.json();

      setGetFile(response_data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div>
          <label>Select image</label>
          <input
            title='Upload'
            type='file'
            name='image'
            id='image'
            onChange={fileUpdates}
          />
        </div>

        <div>
          <button
            className={`bg-blue-600 text-gray-200 active:ring-2 active:ring-blue-800 px-2 py-1 rounded border-none`}
            type={`submit`}
          >
            Upload
          </button>
        </div>
      </form>

      <div>
        <img src={getFile.file_url} className='w-full h-1/2' alt='' />
        <video src={getFile.file_url} muted autoPlay></video>
        <a href={getFile.file_url} rel='noreferrer noopener' download={true}>
          Download
        </a>

        <p>{getFile.file_url}</p>
      </div>
    </>
  );
};

export default Home;
