import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CreatePlaylist.css";

export default function CreatePlaylist({ addPlaylist }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleCreatePlaylist = () => {
    if (name.trim()) {
      addPlaylist(name, description);
      setName('');
      setDescription('');
      navigate('/playlists'); // Redirect to the playlists section
    } else {
      alert('Please enter a playlist name.');
    }
  };

  return (
    <div className="create-playlist">
      <h2>Create New Playlist</h2>
      <div className='playlist-details'>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
}
