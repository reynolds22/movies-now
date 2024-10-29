import React from 'react';
import './playlistCard.css';

export default function PlaylistCard({ title, description }) {
  return (
    <div className="playlist-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
