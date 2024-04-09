// Layout.jsx
import React from 'react';
import { Navbar,Footer } from './Components';
import { Outlet } from 'react-router-dom'

function Layout() {
  <>
  <Navbar/>
  <Outlet /> 
  <Footer />
  </>
}

export default Layout
