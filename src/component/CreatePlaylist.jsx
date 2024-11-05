import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist({ addPlaylist }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);  // For storing the image as a Base64 string
  const navigate = useNavigate();

  // Convert the selected image file to a Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the Base64 string in the state
      };
      reader.readAsDataURL(file);  // Read file as Base64
    }
  };

  const handleSave = () => {
    if (name.trim()) {
      addPlaylist(name, description, image); // Pass Base64 image data
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
