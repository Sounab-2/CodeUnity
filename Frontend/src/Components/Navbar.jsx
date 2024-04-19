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
            <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" fill="white"></path></svg>
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
