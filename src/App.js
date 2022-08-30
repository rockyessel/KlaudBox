import React, {useState, useEffect} from 'react';

function App() {
    const [file, setFile] = useState()
    const [getFile, setGetFile] = useState([])

    console.log(file)

    // useEffect(() => {
    //   const getData = async () => {
    //     const response = await fetch('http://localhost:5000/single-images', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Methods': '*',
    //       },
    //     });
    //
    //     const data = await response.json();
    //     setGetFile(data);
    //   };
    //
    //   getData();
    // }, []);

    const fileUpdates = (event) => {
        setFile(event.target.files)
    }


    const handleSubmission = async (event) => {
        event.preventDefault();


        try {
            const data = new FormData()
            console.log('formData', data)

            data.append('images', file)


             await fetch('http://localhost:5000/multiple-uploads', {
                method: 'POST',
                body: data
            });


        } catch (error) {
            console.log(error.message)
        }
    };



    return (
        <div className='container mx-auto py-10'>
            <h1>EerviFile</h1>
            {getFile?.map((image) => {
                const base64String = btoa(
                    String.fromCharCode(...new Uint8Array(image.image.data.data))
                );

                return (
                    <div>
                        <img
                            src={`data:image/png;base64,${base64String}`}
                            className='w-[20rem]'
                            alt=''
                        />

                        <a
                            href={`data:image/png;base64,${base64String}`}
                            target='_blank'
                            rel='noreferrer'
                            download
                        >
                            Download
                        </a>


                    </div>
                );
            })}

            <div>
                <form onSubmit={handleSubmission}>
                    <div>
                        <label>Select image</label>
                        <input
                            type='file'
                            name='image'
                            id='image'
                            multiple="multiple"
                            onChange={fileUpdates}
                        />
                    </div>

                    <div>
                        <button className={`bg-blue-600 text-gray-200 active:ring-2 active:ring-blue-800 px-2 py-1 rounded border-none`} type={`submit`}>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
