import React from 'react';
import './Popup.css';

export default function Popup({ isOpen, onClose }) {
  if (!isOpen) return null;  // If popup is not open, do not render anything.

  return (
    <div className="popup-box">
      <div className="popup-content">
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Settings</h3>
        <p>Thank you for exploring the site but this button does not have function at the moment and is here for looks.</p>
      </div>
    </div>
  );
}
