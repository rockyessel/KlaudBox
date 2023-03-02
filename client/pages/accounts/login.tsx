import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const [showState, setShowState] = React.useState(false);
  const [accountFormData, setAccountFormData] = React.useState({
    email: '',
    password: '',
    remember_me: false,
  });

  const handleShowPassword = () => {
    setShowState((previousState) => !previousState);
  };

  console.log('accountFormData: ', accountFormData);

  const handleAccountFormData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;

    if (target.type === 'checkbox') {
      setAccountFormData((previousValues) => ({
        ...previousValues,
        [target.name]: target.checked,
      }));
    } else {
      setAccountFormData((previousValues) => ({
        ...previousValues,
        [target.name]: target.value,
      }));
    }
  };

  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <section className='bg-black w-full h-full pt-20'>
        Cover LoginPage
      </section>
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
                value={accountFormData?.email}
                onChange={handleAccountFormData}
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
                  value={accountFormData?.password}
                  onChange={handleAccountFormData}
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
                  name='remember_me'
                  onChange={handleAccountFormData}
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
                Login
              </button>
              <button
                type='button'
                className='w-full inline-flex items-center gap-1 justify-center border-2 border-gray-500/30 px-4 py-2'
              >
                <FcGoogle className='text-xl' />
                <span>Login with Google</span>
              </button>
            </div>
          </form>

          <div className='mt-10 text-center'>
            <p>
              Don&apos;t have an account? Then{' '}
              <Link className='font-bold underline' href='/accounts/register'>
                register
              </Link>{' '}
              to continue
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
