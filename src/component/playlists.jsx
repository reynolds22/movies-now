import React, { useState } from 'react';
import PlaylistCard from './playlistCard';
import './playlists.css';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([
    // Example playlist data; replace with real data or fetch from an API
    { id: 1, title: 'My First Playlist', description: 'A collection of my favorite movies' },
    { id: 2, title: 'Action Hits', description: 'Top action movies' },
    // Add more playlists as needed
  ]);

  // Function to handle creating a new playlist
  const createNewPlaylist = () => {
    // Placeholder for creating a new playlist; open a form or popup if needed
    const newPlaylist = { id: playlists.length + 1, title: `Playlist ${playlists.length + 1}`, description: 'New playlist description' };
    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <div className="playlists-page">
      <h1>Your Playlists</h1>
      <button className="new-playlist-btn" onClick={createNewPlaylist}>Create New Playlist</button>
      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} title={playlist.title} description={playlist.description} />
        ))}
      </div>
    </div>
  );
}
