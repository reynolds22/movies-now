import React, { useState } from 'react';
import Header from './header';
import SlidingMenu from './SlidingMenu'; 
import "./Header.css";
import Footer from './Footer';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
 
  return (
    <> 
      <Header toggleMenu={toggleMenu} />
      <SlidingMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
      <main>{children}</main> {/* Render page content */}
      <Footer/>
    </>
  );
}
