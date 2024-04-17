import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, Submit } from '../../Components';
import { useFirebase } from '../../Context/FirebaseContext';
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from 'react-redux';
import { setUsername as setReduxUsername } from '../../../features/userSlice';
import {axiosInstance} from '../../../utils/index';

const Signup = () => {
  const firebase = useFirebase()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isDisabled = true;
    switch (name) {
      case 'username':
        setUsername(value);
        isDisabled = value === '' || email === '' || password === '' || password.length < 6;
        break;
      case 'email':
        setEmail(value);
        isDisabled = username === '' || value === '' || password === '' || password.length < 6;
        break;
      case 'password':
        setPassword(value);
        isDisabled = username === '' || email === '' || value === '' || value.length < 6;
        break;
      default:
        break;
    }
    setIsButtonDisabled(isDisabled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      setIsButtonDisabled(false); // Re-enable the button
      return; // Exit the function
    }

    try {
      await firebase.signupUserwithEmailAndPassword(email, password);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: username });
        dispatch(setReduxUsername(user.displayName)); // Dispatch the updated username to Redux store

        const result= await axiosInstance.post('/api/v1/auth/register',{name: username,email: user.email,uid: user.uid});
        console.log(result);
        navigate('/signin'); // Redirect to sign-in page
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Something went wrong');
      setIsButtonDisabled(false); // Re-enable the button if signup fails
    }
  };

  const signinwithgoogle = async () => {
    try {
        const userCredential = await firebase.signInUserWithGoogle();
        const { email, uid, displayName } = userCredential.user;
        console.log(displayName, email, uid);
        const result = await axiosInstance.post('/api/v1/auth/register', { name: displayName, email, uid });
        navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
        console.error('Error signing up with Google:', error.message);
    }
};


  return (
    <section className='h-full flex justify-center items-center flex-col gap-6 place-items-center bg-transparent'>
      <h1 className="text-4xl md:text-6xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-bl from-zinc-800 via-slate-200 to-zinc-900 h-20">Sign Up</h1>
      <div className='card w-2/5 bg-base-100 shadow-2xl flex flex-col gap-y-4 p-10'>
        <div className='flex gap-3 flex-col'>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='text'
              label='Enter your User name:'
              name='username'
              value={username}
              onChange={handleInputChange}
              placeholder='Enter your username'
            />
            <FormInput
              type='email'
              label='Enter Your Email:'
              name='email'
              value={email}
              onChange={handleInputChange}
              placeholder='name@email.com'
            />
            <FormInput
              type='password'
              label='Password:'
              name='password'
              value={password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            <div className='mt-4 flex flex-col gap-3'>
              <Submit text={'Sign up'} disabled={isButtonDisabled} />
            </div>
          </form>
          <div className="flex items-center mb-2">
            <div className="w-full h-px bg-gray-600"></div>
            <div className="text-center text-gray-500 px-5 text-sm font-bold">Or</div>
            <div className="w-full h-px bg-gray-600"></div>
          </div>
          <button className='btn w-full' onClick={signinwithgoogle}>
            <span className='flex gap-4 items-center'>
              <img src="./google-color.svg" alt="" className='w-6 h-6' />
              <h1>Sign up with Google</h1>
            </span>
          </button>
        </div>
        <p className='text-center'>
          Already have an account? {' '}
          <Link
            to='/signin'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
