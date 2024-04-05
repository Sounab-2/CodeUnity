import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { FormInput, Submit } from '../../Components';

const Signin = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[isButtonDisabled,setIsButtonDisabled]=useState(true)

    const handleInputChange=(e)=>{
        const{value,name}=e.target;
        if(name==='email'){
          setEmail(value);
        }else if(name === 'password'){
          setPassword(value)
        }
        setIsButtonDisabled(email===''|| password==='');
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Form submitted'); 
      setUsername('');
      setEmail('');
      setPassword('');

    }

  return (
    <section className='h-full flex justify-center items-center flex-col gap-12 place-items-center bg-transparent'>
     <h1 class="text-4xl md:text-6xl tracking-tight  font-bold text-transparent bg-clip-text bg-gradient-to-bl from-zinc-800 via-slate-200 to-zinc-900 h-20 ">Sign In</h1>
      <div
        className='card w-1/3 bg-base-100 shadow-2xl flex flex-col gap-y-4'
      >

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          label='Enter Your Email:'
          name='email'
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your Email"
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        <div className=' mt-4 flex flex-col gap-3'>
          <Submit text={'Log in'} disabled={isButtonDisabled}/>
          <div class="flex items-center mb-2"><div class="w-full h-px bg-gray-600"></div><div class="text-center text-gray-500 px-5 text-sm font-bold">Or</div><div class="w-full h-px bg-gray-600"></div></div>

          <button className=' btn '>
            <span className=' flex gap-4 items-center'>
              <img src="./google-color.svg" alt="" className=' w-6 h-6' />
              <h1>Sign in with Google</h1>
            </span>
          </button>

        </div>
        <p className=' text-center'>
          Not a member yet ? {' '}
          <Link
            to='/signup'
            className=' ml-2 link link-hover link-primary capitalize'

          >
            signup
          </Link>

        </p>
        </form>
      </div>
    </section>
  );
}

export default Signin;