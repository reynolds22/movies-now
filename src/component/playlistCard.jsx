import React from 'react';
import './playlistCard.css';


export default function PlaylistCard({ title, description, image }) {

  return (
    <div className="playlist-card">
      <div className="img-con">
        <img
          src={image || "default.jpg"} // Fallback to a default image
          alt={title || "Playlist Cover"} // Fallback for alt text
          className="playlist-image"
        />
      </div>
      <div className="playlist-details">
        <h3>{title || "Untitled Playlist"}</h3>
        <p>{description || "__________________"}</p>
      </div>
    </div> 
  );
}
 