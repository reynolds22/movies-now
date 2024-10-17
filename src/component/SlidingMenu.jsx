import React, { useState } from 'react';
import './SlidingMenu.css';
import Popup from './PopUp';
import { Link } from 'react-router-dom';  

export default function SlidingMenu({ isOpen, closeMenu }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Open the settings popup
  const openSettingsPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the settings popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-menu-btn" onClick={closeMenu}>X</button>
        <ul>
          <li><a href="/playlists">Playlists</a></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li> 
          <li style={{ position: 'relative' }}>
            <button className="menu-link" onClick={openSettingsPopup}>Settings</button>
            {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={closePopup} />}
          </li>
          <li>
            <button>Go Home</button>
          </li>
        </ul>
      </div>
    </>
  );
}
