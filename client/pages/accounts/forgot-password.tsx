import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const ForgotPasswordPage = () => {
  const [showState, setShowState] = React.useState(false);
  const [accountFormData, setAccountFormData] = React.useState({
    email: '',
  });

  const handleShowPassword = () => {
    setShowState((previousState) => !previousState);
  };


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

            <div className='flex flex-col gap-4 font-medium'>
              <button
                type='submit'
                className='bg-black text-white w-full px-4 py-2'
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
