import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./CreatePlaylist.css";

export default function CreatePlaylist({ addPlaylist }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // For uploading an optional image
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])); // Preview the selected image
    }
  };

  const handleSave = () => {
    if (name.trim()) {
      addPlaylist(name, description, image); // Passing individual arguments
      setName("");
      setDescription("");
      setImage(null);
      navigate('/playlists');
    } else {
      alert("Playlist name is required.");
    }
  };

  return (
    <div className="create-playlist">
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Cancel
        </button>
      </div>
      <h1>Create New Playlist</h1>
      <input
        type="text"
        placeholder="Playlist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Optional Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleSave}>Save Playlist</button>
    </div>
  );
}
