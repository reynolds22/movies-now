import React from 'react';
import './playlistCard.css';

export default function PlaylistCard({ title, description, image }) {
  return (
    <div className="playlist-card">
      <img src={image} alt={`${title} cover`} className="playlist-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
