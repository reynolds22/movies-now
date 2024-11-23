import React, { useState } from 'react';

export default function CreatePlaylist({ addPlaylist }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePlaylist = () => {
    if (name.trim()) {
      addPlaylist(name, description);
      setName('');
      setDescription('');
      alert('Playlist created successfully!');
    } else {
      alert('Please enter a playlist name.');
    }
  };

  return (
    <div className="create-playlist">
      <h2>Create New Playlist</h2>
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
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
}
