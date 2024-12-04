// AddToPlaylistPopup.jsx
import React from "react";
import "./AddToPlaylistPopup.css";

export default function AddToPlaylistPopup({ playlists, onAdd, onClose, position }) {
  if (!position) return null;

  return (
    <div
      className="add-to-playlist-popup"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 1000, 
      }}
    >
      <div className="theX">
        <button onClick={onClose}>X</button>
      </div>
      <h3>Select Playlist</h3>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id} onClick={() => onAdd(playlist.id)}>
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
