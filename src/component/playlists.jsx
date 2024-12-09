import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PlaylistCard from './playlistCard';
import './playlists.css';
import Footer from "./Footer.jsx";

export default function Playlists({ playlists }) {
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    navigate('/playlists/create'); // Navigate to the create playlist page
  };

  return (
    <div>
      <div className="playlists-page">
        <h1>Your Playlists</h1>
        <button className="new-playlist-btn" onClick={handleCreatePlaylist}>
          Create New Playlist
        </button>
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <Link
              to={`/playlists/${playlist.id}`}
              key={playlist.id}
              className="playlist-link"
            >
              <PlaylistCard
                title={playlist.name}
                description={playlist.description}
                image={playlist.image || 'default.jpg'}
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
