import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToPlaylistPopup from './AddToPlaylistPopup';
import './PlaylistDetail.css';

export default function PlaylistDetail({ playlists, setPlaylists, addMovieToPlaylist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const playlist = playlists.find((pl) => pl.id === parseInt(id));
  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  const isUsingFirstMovieImage =
    !playlist.image && playlist.movies.length > 0 && playlist.movies[0]?.poster_path;

  // Handle Upload Image
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPlaylists((prev) =>
          prev.map((pl) =>
            pl.id === playlist.id
              ? {
                  ...pl,
                  image: event.target.result, // Use base64 data as the image source
                }
              : pl
          )
        );
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  // Remove Uploaded Playlist Image
  const handleRemoveImage = () => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlist.id
          ? {
              ...pl,
              image: playlist.movies[0]?.poster_path
                ? `https://image.tmdb.org/t/p/w500${playlist.movies[0].poster_path}`
                : null,
            }
          : pl
      )
    );
  };

  // Delete Playlist
  const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
    if (confirmDelete) {
      setPlaylists(playlists.filter((pl) => pl.id !== playlist.id));
      navigate('/playlists');
    }
  };

  // Delete Movie from Playlist
  const handleDeleteMovie = (movieId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlist.id
          ? { ...pl, movies: pl.movies.filter((movie) => movie.id !== movieId) }
          : pl
      )
    );
  };

  // Open Add to Playlist Popup
  const handleOpenPopup = (movie, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  // Add Movie to Playlist
  const handleAddToPlaylist = (playlistId) => {
    if (selectedMovie) {
      addMovieToPlaylist(playlistId, selectedMovie);
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="playlist-detail">
      {/* Top Bar */}
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-arrow">
          ← Back
        </button>
        <button onClick={() => setIsEditMode(!isEditMode)} className="edit-button">
          {isEditMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

{/* Playlist Info */}
<div className="playlist-info">
  <img
    className="playlist-image"
    src={playlist.image || (playlist.movies[0]?.poster_path && `https://image.tmdb.org/t/p/w500${playlist.movies[0].poster_path}`) || 'default.jpg'}
    alt={playlist.name}
  />
  <h2>{playlist.name}</h2>
  <p>{playlist.description}</p>
  {isEditMode && (
    <div className="action-buttons">
      {/* Upload Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        style={{ display: 'none' }}
        id="upload-image-input"
      />
      <label htmlFor="upload-image-input" className="upload-img-button">
        Upload Image
      </label>

      {/* Updated logic for "Remove Image" */}
      {playlist.image && playlist.image !== `https://image.tmdb.org/t/p/w500${playlist.movies[0]?.poster_path}` && (
        <button onClick={handleRemoveImage} className="delete-img-button">
          Remove Image
        </button>
      )}

      {/* Delete Playlist */}
      <button onClick={handleDeletePlaylist} className="delete-playlist-button">
        Delete Playlist
      </button>
    </div>
  )}
</div>

      {/* Movies */}
      <div className="playlist-movies">
        {playlist.movies.length > 0 ? (
          playlist.movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />
              <h3>{movie.title || movie.name}</h3>
              {isEditMode && (
                <button onClick={() => handleDeleteMovie(movie.id)} className="delete-movie">
                  Delete Movie
                </button>
              )}
              <button onClick={(e) => handleOpenPopup(movie, e)} className="add-to-playlist">
                Add to Playlist
              </button>
            </div>
          ))
        ) : (
          <p>No movies in this playlist.</p>
        )}
      </div>

      {/* Popup for Adding to Playlist */}
      {isPopupOpen && (
        <AddToPlaylistPopup
          playlists={playlists}
          onAdd={handleAddToPlaylist}
          onClose={() => setIsPopupOpen(false)}
          position={popupPosition}
        />
      )}
    </div>
  );
}
