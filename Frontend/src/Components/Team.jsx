import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Team = () => {
   return (
      <>
         <section class="history" id="history" className=' bg-primary-content flex justify-center items-center min-h-screen flex-col gap-5 '>
            {/* <div class="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/shape.svg)] bg-cover bg-center bg-no-repeat"></div> */}

            <h1 className=' flex items-center md:text-4xl text-2xl text-white font-extrabold md:mt-0 mt-4'>Meet Our Team Members</h1>
            <div id="mainnav" className=' relative w-full'>

               <img src="/shape.svg" alt="shape" className='absolute inset-0 w-screen h- object-cover ' />
               <div id="main-history" data-aos="fade-in" >
                  <div id="history-section1" class="history-section1">
                     <figure class="sub-history">
                        <div class="image" data-aos="zoom-in"><img src="/images/shrey.jpg" loading="lazy" alt="Hinduism" className=' h-56 w-full' />
                        </div>
                        <figcaption data-aos="zoom-in" className=' bg-slate-900'>
                           <h3>Shreyam Kundu</h3>
                           <h4 className=' font-extrabold'>Full Stack Developer || MERN Developer</h4>
                           <div className=' w-full p-20 flex  justify-between'>
                              <Link to=''><img src="./github.svg" alt="" className=' h-10 w-10' /></Link>
                              <Link to=''><img src="./linkedin.svg" alt="" className=' h-10 w-10 bg-white' /></Link>
                           </div>
                        </figcaption>
                     </figure>

                     <figure class="sub-history">
                        <div class="image" data-aos="zoom-in"><img src="/images/snik.jpg" loading="lazy" alt="Hinduism" className=' h-56 w-full' />
                        </div>
                        <figcaption data-aos="zoom-in" className=' bg-slate-900'>
                           <h3>Snikdhendu Pramanik</h3>
                           <h4 className=' font-extrabold'>Full Stack Developer || MERN Developer</h4>
                           <div className=' w-full p-20 flex  justify-between'>
                              <Link to=''><img src="./github.svg" alt="" className=' h-10 w-10' /></Link>
                              <Link to=''><img src="./linkedin.svg" alt="" className=' h-10 w-10 bg-white' /></Link>
                           </div>
                        </figcaption>
                     </figure>

                     <figure class="sub-history">
                        <div class="image" data-aos="zoom-in"><img src="/images/shrey.jpg" loading="lazy" alt="Hinduism" className=' h-56 w-full' />
                        </div>
                        <figcaption data-aos="zoom-in" className=' bg-slate-900'>
                           <h3>Sounab Bhattacharjee</h3>
                           <h4 className=' font-extrabold'>Full Stack Developer || MERN Developer</h4>
                           <div className=' w-full p-20 flex  justify-between'>
                              <Link to=''><img src="./github.svg" alt="" className=' h-10 w-10' /></Link>
                              <Link to=''><img src="./linkedin.svg" alt="" className=' h-10 w-10 bg-white' /></Link>
                           </div>
                        </figcaption>
                     </figure>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Team;
