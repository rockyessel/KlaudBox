import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const RegisterPage = () => {
  const [showState, setShowState] = React.useState(false);
  const [formData, setFormData] = React.useState({email:'', password: ''});

  const handleShowPassword = () => {
    setShowState((previousState) => !previousState);
  };

  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <section className='bg-gray-300 w-full h-full pt-20 px-20'>
        <div className='lg:w-[30rem] flex flex-col justify-center h-full gap-10 mx-auto'>
          <div className='text-center'>
            <p className='text-5xl'>Welcome back?</p>
            <p className='text-xl'>
              The faster you fill up, the faster you get a ticket
            </p>
          </div>

          <form className='flex flex-col gap-5 font-medium'>
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input
                title='email'
                className='input rounded-none'
                placeholder='Enter your email'
                name='email'
                // value=''
                onChange={() => {}}
                type='text'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <div className='input rounded-none flex items-center justify-between'>
                <input
                  title='password'
                  className='outline-none w-full'
                  placeholder='Enter your password'
                  name='password'
                  // value=''
                  onChange={() => {}}
                  type={`${showState ? 'text' : 'password'}`}
                />
                {showState ? (
                  <AiFillEyeInvisible
                    onClick={handleShowPassword}
                    className='text-4xl p-1 hover:bg-black hover:text-white rounded-md'
                  />
                ) : (
                  <AiFillEye
                    onClick={handleShowPassword}
                    className='text-4xl p-1 hover:bg-black hover:text-white rounded-md'
                  />
                )}
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-1'>
                <input
                  title='checkbox'
                  className='checkbox'
                  name='checkbox'
                  onChange={() => {}}
                  type='checkbox'
                />
                <label>Remember me</label>
              </div>

              <Link href='/accounts/forgot-password'>Forgot Password?</Link>
            </div>

            <div className='flex flex-col gap-4 font-medium'>
              <button
                type='submit'
                className='bg-black text-white w-full px-4 py-2'
              >
                Register
              </button>
              <button
                type='button'
                className='w-full inline-flex items-center gap-1 justify-center border-2 border-gray-500/30 px-4 py-2'
              >
                <FcGoogle className='text-xl' />
                <span>Sign up with Google</span>
              </button>
            </div>
          </form>

          <div className='mt-10 text-center'>
            <p>
              Have an account? Then{' '}
              <Link className='font-bold underline' href='/accounts/login'>
                Login
              </Link>{' '}
              to continue
            </p>
          </div>
        </div>
      </section>
      <section className='bg-black w-full h-full pt-20'>
        Cover RegisterPage
      </section>
    </main>
  );
};

export default RegisterPage;
