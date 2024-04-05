import React from 'react';
import { Form, Link } from 'react-router-dom'; // Import Form and Link
import { FormInput, Submit } from '../../Components';

const Signin = () => {
  return (
    <section className='h-full flex justify-center items-center flex-col gap-6 place-items-center bg-transparent'>
        <h1 class="text-4xl md:text-6xl tracking-tight  font-bold text-transparent bg-clip-text bg-gradient-to-bl from-zinc-800 via-slate-200 to-zinc-900 h-20 ">Sign Up</h1>
      <div
        className='card w-2/5 bg-base-100 shadow-2xl flex flex-col gap-y-4'
      >

        <FormInput
          type='user'
          label='Enter your User name :'
          name='User'
          defaultValue='Shreyam Kundu'
        />
        <FormInput
          type='email'
          label='Enter Your Email:'
          name='email'
          defaultValue='name@email.com'
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          defaultValue='secret'
        />

        <div className=' mt-4 flex flex-col gap-3'>
          <Submit text={'Log in'} />
          <div class="flex items-center mb-2"><div class="w-full h-px bg-gray-600"></div><div class="text-center text-gray-500 px-5 text-sm font-bold">Or</div><div class="w-full h-px bg-gray-600"></div></div>

          <button className=' btn '>
            <span className=' flex gap-4 items-center'>
              <img src="./google-color.svg" alt="" className=' w-6 h-6' />
              <h1>Sign in with Google</h1>
            </span>
          </button>

        </div>
        <p className=' text-center'>
          Already have an account ? {' '}
          <Link
            to='/signin'
            className=' ml-2 link link-hover link-primary capitalize'

          >
            signin
          </Link>

        </p>
      </div>
    </section>
  );
}

export default Signin;
