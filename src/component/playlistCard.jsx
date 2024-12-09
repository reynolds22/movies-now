import React from 'react';
import './playlistCard.css';


export default function PlaylistCard({ title, description, image }) {
  console.log("Title:", title);
  console.log("Description:", description);
  return (
    <div className="playlist-card">
      <div className="img-con">
        <img src={image} alt={`${title} cover`} className="playlist-image" />
      </div>
      <div className="playlist-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  ); 
}
 