import React from 'react';
import { DeveloperQuotes } from '../../Components';
import { useFirebase } from '../../Context/FirebaseContext';
import { Link } from 'react-router-dom';

const MainDashBoard = () => {
  const { user, signoutUser } = useFirebase();
  return (
    
    <div className=" pt-28 min-h-screen lg:ml-64 flex flex-col gap-10 p-12">
       {user ? (
        <h1 className='text-base-content text-3xl font-extrabold'>Welcome back 👋, {user.displayName}</h1>
      ) : (
        <h1 className='text-base-content text-3xl font-extrabold'>Welcome back! 👋</h1>
      )}
      <DeveloperQuotes/>
      <div className=' w-full justify-between flex flex-wrap '>
        <span className='  flex flex-col gap-7 justify-center items-center border-2 rounded-lg p-16 '>
          <h1 className=' text-base-content font-bold text-4xl'>Don't be late, start your work now. </h1>
          <Link to='/dashboard/newproject' className=' btn bg-primary text-primary-content'>Create a new WorkSpace</Link>

        </span>
      <img src="./Gen Z.gif" className=' rounded-full h-72 w-72 shadow-lg shadow-slate-50' alt="gif" />
      </div>
      
    </div>
  );
}

export default MainDashBoard;
