import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FormValidation } from '@/utils/functions';
import { FormErrorProps } from '@/interface';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/reduxtoolkit/app/store';
import { login } from '@/reduxtoolkit/features/auth/auth-request';
import { reset } from '@/reduxtoolkit/features/files/files-slice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Loader from '@/components/atoms/loader';

const LoginPage = () => {
  const [showState, setShowState] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember_me: false,
  });
  const [emailErr, setEmailErr] = React.useState<FormErrorProps>({
    state: false,
    msg: '',
  });
  const [passwordErr, setPasswordErr] = React.useState<FormErrorProps>({
    state: false,
    msg: '',
  });
  const { isLoading, user, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleShowPassword = () => {
    setShowState((previousState) => !previousState);
  };

  const handleAccountFormData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;

    if (target.type === 'checkbox') {
      setFormData((previousValues) => ({
        ...previousValues,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((previousValues) => ({
        ...previousValues,
        [target.name]: target.value,
      }));
    }
  };

  const handleValidation = (): { email: boolean; password: boolean } => {
    const email: boolean = FormValidation(
      'email',
      formData.email,
      emailErr,
      setEmailErr
    );
    const password: boolean = FormValidation(
      'password',
      formData.password,
      passwordErr,
      setPasswordErr
    );

    return { email, password };
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const validateObject = handleValidation();
      const { email, password } = validateObject;
      if (!email || !password) return;
      await dispatch(login(formData));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    user ? router.push('/dashboard') : null;
    if (!user) console.log('you need to login');
    dispatch(reset());
  }, [dispatch, router, success, user]);

  if (isLoading) {
    router.push('/dashboard');
    return <Loader />;
  }
  return (
    <main className='w-screen h-screen flex justify-center bg-gray-300 items-center'>
      <section className='w-full h-full flex justify-center items-center'>
        <div className='lg:w-[50rem] w-full flex flex-col gap-5 px-4 lg:px-20 mx-auto'>
          <div className='text-center mb-5'>
            <p className='text-xl lg:text-5xl font-bold lg:mb-5'>
              Welcome back
            </p>
            <p className='text-sm lg:text-xl font-medium'>
              Continue from where you left off.
            </p>
          </div>

          <form
            onSubmit={handleSubmission}
            className='flex flex-col gap-5 font-medium '
          >
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input
                title='email'
                className='input rounded-none'
                placeholder='Enter your email'
                name='email'
                value={formData?.email}
                onChange={handleAccountFormData}
                type='text'
              />
              {emailErr.state && (
                <p className={`text-sm text-red-600 font-light`}>
                  {emailErr.msg}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <div className='input rounded-none flex items-center justify-between'>
                <input
                  title='password'
                  className='outline-none w-full'
                  placeholder='Enter your password'
                  name='password'
                  value={formData?.password}
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
              {passwordErr.state && (
                <p className={`text-sm text-red-600 font-light`}>
                  {passwordErr.msg}
                </p>
              )}
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-1'>
                <input
                  title='checkbox'
                  className='checkbox'
                  name='remember_me'
                  type='checkbox'
                  onChange={handleAccountFormData}
                />
                <label>Read Terms and Conditions</label>
              </div>

              <Link href='/accounts/forgot-password'>Forgot Password?</Link>
            </div>

            <div className='flex flex-col gap-4 font-medium'>
              <button
                type='submit'
                className='bg-black text-white w-full px-4 py-2'
              >
                Log into account
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
              Have an account? Then{' '}
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
