import React from 'react';
import { Navbar, Footer, Hero, Feauters, Team } from '../../Components';
import YouTube from 'react-youtube';
const About = () => {
  const videoId = 'QCJET0iawEs';

  // Options for the YouTube player
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0, // Autoplay disabled
    },
  };
  return (
    <>
      <Navbar />
      <div className=' border-3 min-h-4/5 bg-primary-content'>
        <img src="/shape.svg" alt="shape" className='absolute inset-0 w-screen top-20 object-cover ' />
        
        < div className='absolute md:left-28 sm:right-36 right-4 top-96 mt-50 md:top-48 md:h-80 md:w-1/3  border-4 rounded-lg sm:top-96 sm:mt-20 sm:h-60 sm:w-2/3 md:mt-0 justify-center items-center flex h-60 w-11/12 '>
          {/* YouTube video */}

          <YouTube videoId={videoId} opts={opts} className='absolute top-0 left-0 w-full h-full' />


        </div>
        <div className="mockup-phone border-primary absolute right-28 mt-3 w-96">
          <div className="camera"></div>
          <div className="display border-2">
           
              <div class="container mx-auto p-5 w-full bg-base-300">
              <h2 class="text-base font-bold mb-2">Step 1: Sign Up or Log In</h2>
              <p class="mb-6">Create an account or log in using your email or social authentication.</p>

              <h2 class="text-base  font-bold mb-2">Step 3: Collaborate in Real Time</h2>
              <p class="mb-6">Collaborate with team members in real-time using the collaborative code editor.</p>

              <h2 class="text-base  font-bold mb-2">Step 4: Communication and Assistance</h2>
              <p class="mb-6">Communicate with your collaborators using the built-in chat feature. Optionally, use AI assistance for code suggestions and optimizations.</p>

              <h2 class="text-base  font-bold mb-2">Step 5: Save and Share Session</h2>
              <p class="mb-6">Save your progress during the coding session and share the session link with others for collaboration.</p>

              <h2 class="text-base  font-bold mb-2">Step 6: Log Out</h2>
              <p>When finished, securely log out of the application to end your session.</p>
            </div>
            </div>
          </div>
        </div>
   
      {/* <Footer/> */}
    </>
  );
}

export default About;
