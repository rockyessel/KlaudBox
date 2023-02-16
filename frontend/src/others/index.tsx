import React, { ChangeEvent } from 'react';

const Home = () => {
  const [file, setFile] = React.useState<any>();
  const [identifier, setIdentifier] = React.useState('');
  const [getFile, setGetFile] = React.useState<any>({});
  const [getFile2, setGetFile2] = React.useState<any>({});

  React.useEffect(() => {
    const d = async () => {
      const res = await fetch('http://localhost:43434/v1/guest');

      const data = await res.json();

      setFile(data);
    };
  }, []);

  console.log(file);
  console.log('image url', getFile);

  const fileUpdates = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile: any = files as FileList;
    setFile(selectedFile?.[0]);
  };

  const handleSubmission = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const data = new FormData();
      console.log('formData', data);

      data.append('file', file);

      const response = await fetch('http://localhost:43434/v1/guest', {
        method: 'POST',
        body: data,
      });

      const response_data = await response.json();

      setGetFile(response_data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmissionD = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:43434/v1/guest/${identifier}`
      );

      const response_data = await response.json();

      setGetFile2(response_data);
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
        <img
          src={getFile.file.file_url || getFile2.file.file_url}
          className='w-full h-1/2'
          alt=''
        />

        <a
          href={getFile.file.file_url}
          rel='noreferrer noopener'
          download={true}
        >
          Download
        </a>

        <p>{getFile.file_url}</p>

        <form onSubmit={handleSubmissionD}>
          <div>
            <label>Select image</label>
            <input
              value={identifier}
              title='Upload'
              type='text'
              name='image'
              id='image'
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </div>

          <div>
            <button
              className={`bg-blue-600 text-gray-200 active:ring-2 active:ring-blue-800 px-2 py-1 rounded border-none`}
              type={`submit`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
