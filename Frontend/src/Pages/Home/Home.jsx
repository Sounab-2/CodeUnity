import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';
import { Navbar , Footer ,Hero , Feauters,Team} from '../../Components';
import { useSelector } from 'react-redux';

const Home = () => {
  
  const username = useSelector(state => state.username);
  console.log(username);
  return (
    <section>
    <Navbar/>
    <Hero/>
    {/* <div className='min-h-screen w-full h-full'>
      {user ? (
        <div className=' flex flex-col gap-4'>
          <p>User Email: {user.email}</p>
          <button className=' btn'onClick={signoutUser}>Logout</button>
        </div>
      ) : (
        <Link className='btn' to='/signin'>Signin</Link>
      )}
    </div> */}
    <Feauters/>
    {/* <hr /> */}
    <Team/>
    <Footer/>
    </section>
  );
}

export default Home;
