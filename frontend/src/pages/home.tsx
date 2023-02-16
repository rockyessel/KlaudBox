import React from 'react';
import { Navbar } from '../components';

const Home = () => {
  return (
    <React.Fragment>
      <section className='px-6 lg:px-20 w-full py-20 flex items-center justify-center'>
        <div className='w-full justify-around flex items-center'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <p className='text-xl text-gray-800/80'>
                The easy way to store and share files online.
              </p>
              <p className='text-6xl capitalize font-bold max-w-lg'>
                Upload, save, and share all your important files.
              </p>

              <p className='text-xl text-gray-800/80'>
                Upload once, access anywhere.
              </p>
            </div>

            <div className='font-bold flex items-center gap-4'>
              <button className='bg-black text-white px-4 py-2 rounded-md'>
                Upload
              </button>
              <button className='border border-black px-4 py-2 rounded-md'>
                Demo video
              </button>
            </div>
          </div>
          <div>
            <img
              src='/bg.webp'
              className='w-[45rem] rounded-3xl border-2 border-black/10 shadow-lg'
              alt=''
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
