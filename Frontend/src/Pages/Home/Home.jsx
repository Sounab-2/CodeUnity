import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';

const Home = () => {
  const { user, signoutUser } = useFirebase();

  return (
    <div className='min-h-screen w-full h-full'>
      {user ? (
        <div className=' flex flex-col gap-4'>
          <p>User Email: {user.email}</p>
          <button className=' btn'onClick={signoutUser}>Logout</button>
        </div>
      ) : (
        <Link className='btn' to='/signin'>Signin</Link>
      )}
    </div>
  );
}

export default Home;
