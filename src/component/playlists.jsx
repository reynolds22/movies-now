import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PlaylistCard from "./playlistCard";
import "./playlists.css";

export default function Playlists({ playlists = [] }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromCreate) {
      setShowPopup(true);

      // Clear the state so the popup doesn't show again when navigating back
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => setShowPopup(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleCreatePlaylist = () => {
    navigate("/playlists/create");
  };

  return (
    <div className="playlists-page">
      {showPopup && (
        <div className="popup">
          Playlist created! Please refresh the page to load details.
        </div>
      )}
      <h1>Your Playlists</h1>
      <button className="new-playlist-btn" onClick={handleCreatePlaylist}>
        Create New Playlist
      </button>
      <div className="playlists-grid">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Link
              to={`/playlists/${playlist.id}`}
              key={playlist.id}
              className="playlist-link"
            >
              <PlaylistCard
                title={playlist.name}
                description={playlist.description}
                image={playlist.image || "default.jpg"}
              />
            </Link>
          ))
        ) : (
          <p>No playlists available. Create one to get started!</p>
        )}
      </div>
    </div>
  );
} 
