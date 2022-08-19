import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [state, setState] = useState();
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:4000/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
        },
      });

      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);

  const handleSubmission = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleChange = (event) => {
    setState(event.target.files[0]);
  };

  return (
    <div className='App'>
      <h1>EerviFile</h1>
      {data.map((image) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(image.image.data.data))
        );

        return <img src={`data:image/png;base64,${base64String}`} alt='' />;
      })}

      <div>
        <form onSubmit={handleSubmission}>
          <div>
            <label>FileName:</label>
            <input type='text' value='testImage' />
          </div>

          <div>
            <label>Select image</label>
            <input
              type='file'
              name='image'
              id='image'
              onChange={handleChange}
            />
          </div>

          <div>
            <button>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
