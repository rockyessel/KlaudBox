import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FormErrorProps } from '@/interface';
import { FormValidation } from '@/utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/reduxtoolkit/app/store';
import { register } from '@/reduxtoolkit/features/auth/auth-request';
import { reset } from '@/reduxtoolkit/features/auth/auth-slice';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [showState, setShowState] = React.useState(false);
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
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { loading, user, error, success } = useSelector(
    (state: RootState) => state.auth
  );

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

      console.log('formData', formData);

      const data = { email: formData.email, password: formData.password };

      dispatch(register(data));

      //  await UserPostFile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (success) {
      router.push('/dashboard');
    }

    dispatch(reset());
  }, [dispatch, router, success, user]);

  if (loading)
    return (
      <main className='bg-rose-800 text-white font-extrabold'>Loading</main>
    );

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

          <form
            onSubmit={handleSubmission}
            className='flex flex-col gap-5 font-medium'
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
                <span>Register with Google</span>
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
