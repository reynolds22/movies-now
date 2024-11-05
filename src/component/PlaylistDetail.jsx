import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaylistDetail.css';

export default function PlaylistDetail({ playlists }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the playlist by ID
  const playlist = playlists.find(pl => pl.id === parseInt(id));
  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  return (
    <div className="playlist-detail">
      {/* Header */}
      <header>
        {/* Include your Header component if needed */}
      </header>

      {/* Back Arrow and Edit Button */}
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-arrow">← Back</button>
        <button className="edit-button">Edit</button>
      </div>

      {/* Playlist Details */}
      <div className="playlist-info">
        <img
          className="playlist-image"
          src={playlist.image || (playlist.movies[0]?.poster_path && `https://image.tmdb.org/t/p/w500${playlist.movies[0].poster_path}`) || 'default.jpg'}
          alt={playlist.name}
        />
        <h2>{playlist.name}</h2>
        <p>{playlist.description}</p>
      </div>

      {/* Movies in Playlist */}
      <div className="playlist-movies">
        {playlist.movies.length > 0 ? (
          playlist.movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />
              <h3>{movie.title || movie.name}</h3>
            </div>
          ))
        ) : (
          <p>No movies added yet.</p>
        )}
      </div>

      {/* Footer */}
      <footer>
        {/* Include your Footer component if needed */}
      </footer>
    </div>
  );
}
