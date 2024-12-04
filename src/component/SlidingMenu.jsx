import React, { useState } from 'react';
import './SlidingMenu.css';
import Popup from './PopUp';
import { Link, useNavigate } from 'react-router-dom';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';  

export default function SlidingMenu({ isOpen, closeMenu }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Open the settings popup
  const openSettingsPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the settings popup 
  const closePopup = () => {
    setIsPopupOpen(false);
  }; 

  const goToHome = () => {
    navigate('/');  // Navigate to the main page (root)
    closeMenu();    // Close the sliding menu after navigation
  }; 

  console.log('SlidingMenu Props:', { isOpen, closeMenu });

  return ( 
    <>
      <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-menu-btn" onClick={closeMenu}>X</button>
        <ul>
        <li>
          <Link to="/playlists" onClick={closeMenu}>Playlists</Link>
        </li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li> 
          <li style={{ position: 'relative' }}>
            <button className="menu-link" onClick={openSettingsPopup}>Settings</button>
            {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={closePopup} />}
          </li>
          <li>
            <button onClick={goToHome}>
                <FontAwesomeIcon icon={faFilm} style={{ marginRight: '8px' }} />
                Go Home
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
