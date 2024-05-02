import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import AvatarCom from './AvatarCom';
import { useFirebase } from '../Context/FirebaseContext';
import Themetoggler from './Themetoggler'

export default function Header() {
 
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { user, signoutUser } = useFirebase();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  return (
    <header className="sticky z-50 top-0 flex flex-col ">
      <nav className={`px-4 lg:px-6 py-2.5 text-xl ${isScrolled ? 'glass' : 'bg-base-300 '}`}>

        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src="./images/logo.png" className=' h-10 w-16' alt="" />
            <span className=' font-extrabold text-2xl text-white'>CodeUnity</span>
          </Link>
          <span onClick={toggleMobileNav}
            className=' absolute left-5'>
            {/* <FontAwesomeIcon icon={faBars} className="md:hidden" /> */}
          </span>
          {user ? (

            <div className="flex items-center lg:order-2 gap-5">

              <AvatarCom />
              <Themetoggler/>
            </div>


          ) : (
            <div className="flex items-center lg:order-2">
              <Link
                to="/signin"
                className="text-gray-800 bg-gray-50 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                <div className='w-16 justify-between flex'>
                  <span><FontAwesomeIcon icon={faUserPlus} /></span>
                  <h3>Log in</h3>
                </div>
              </Link>
              <Link
                to="/signup"
                className=' btn bg-primary-content'
              >
                <h3>Sign Up</h3>
              </Link>
            </div>
          )}

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                  }
                  activeClassName="text-primary-1250"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                  }
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                  }
                  activeClassName="text-primary-1250"
                >
                  Get Started
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactUs"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                  }
                  activeClassName="text-primary-1250"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className={`lg:hidden ${isMobileNavOpen ? 'block' : 'hidden'} bg-gray-800 relative z-20 `}>
        <ul className="flex flex-col  font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
          <li>
            <NavLink
              to="/"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
              activeClassName="text-primary-1250"
              onClick={toggleMobileNav}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
              activeClassName="text-primary-1250"
              onClick={toggleMobileNav}
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
              activeClassName="text-primary-1250"
              onClick={toggleMobileNav}
            >
              Get Started
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactUs"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
              activeClassName="text-primary-1250"
              onClick={toggleMobileNav}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

      </div>
      <hr />
    </header>
  );
}
