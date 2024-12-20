import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePlaylist.css";

export default function CreatePlaylist({ addPlaylist }) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      console.log("Creating new playlist:", {
        name: playlistName,
        description: playlistDescription,
      });
      addPlaylist(playlistName, playlistDescription);
      setPlaylistName("");
      setPlaylistDescription("");
      // Pass state when navigating back to Playlists
      navigate("/playlists", { state: { fromCreate: true } });
    } else {
      alert("Please enter a playlist name.");
    }
  };

  return (
    <div className="create-playlist">
      <h2>Create New Playlist</h2>
      <div className="playlist-details">
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
      </div>
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
}

