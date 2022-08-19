import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'GETt',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*'
        },
      });

      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className='App'>
      <h1>EerviFile</h1>
    </div>
  );
}

export default App;
