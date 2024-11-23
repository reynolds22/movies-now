import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToPlaylistPopup from './AddToPlaylistPopup';
import './PlaylistDetail.css';
import Footer from './Footer';

export default function PlaylistDetail({ playlists, setPlaylists, addMovieToPlaylist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [draggedMovieIndex, setDraggedMovieIndex] = useState(null);

  const playlist = playlists.find((pl) => pl.id === parseInt(id));
  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  // Handle Drag Start
  const handleDragStart = (index) => {
    if (!isEditMode) return; // Only allow dragging in edit mode
    setDraggedMovieIndex(index);
  };

  // Handle Drag Over
  const handleDragOver = (e) => {
    if (!isEditMode) return; // Only allow drag-over in edit mode
    e.preventDefault(); // Allow dropping by preventing the default behavior
  };

  // Handle Drop
  const handleDrop = (dropIndex) => {
    if (!isEditMode || draggedMovieIndex === null || draggedMovieIndex === dropIndex) return;

    const updatedMovies = [...playlist.movies];
    const [draggedMovie] = updatedMovies.splice(draggedMovieIndex, 1);
    updatedMovies.splice(dropIndex, 0, draggedMovie);

    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlist.id ? { ...pl, movies: updatedMovies } : pl
      )
    );
    setDraggedMovieIndex(null); // Reset the dragged index
  };

  // Save the current first movie as the playlist image
  const handleSaveImage = () => {
    if (playlist.movies.length > 0) {
      const firstMovie = playlist.movies[0];
      const newImage = `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`;
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.id === playlist.id
            ? { ...pl, image: newImage }
            : pl
        )
      );
    } else {
      alert('No movies in the playlist to set as an image.');
    }
  };

  // Delete Playlist
  const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
    if (confirmDelete) {
      setPlaylists(playlists.filter((pl) => pl.id !== playlist.id));
      navigate('/playlists');
    }
  };

  // Open Add to Playlist Popup
  const handleOpenPopup = (movie, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <div className="playlist-detail">
        {/* Top Bar */}
        <div className="top-bar">
          <button onClick={() => navigate(-1)} className="back-arrow">
            ← Back
          </button>
          <button onClick={() => setIsEditMode(!isEditMode)} className="edit-button">
            {isEditMode ? 'Done' : 'Edit'}
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
              <button onClick={handleSaveImage} className="save-img-button">
                Save Playlist Image
              </button>
              <button onClick={handleDeletePlaylist} className="delete-playlist-button">
                Delete Playlist
              </button>
            </div>
          )}

          {/* Info Boxes */}
          {isEditMode && (
            <>
              <div className="info-box left-info">
                <p>
                  Use the <strong>Save Playlist Image</strong> button to save the current first movie's image as the playlist cover. The image will persist even if the first movie is removed.
                </p>
              </div>
              <div className="info-box right-info">
                <p>
                  Drag and drop movies to rearrange their order. This feature is only available in edit mode.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Movies */}
        <div className="playlist-movies">
          {playlist.movies.length > 0 ? (
            playlist.movies.map((movie, index) => (
              <div
                key={movie.id}
                className="movie-card"
                draggable={isEditMode} // Enable drag only in edit mode
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />
                <h3>{movie.title || movie.name}</h3>
                {isEditMode && (
                  <button
                    onClick={() =>
                      setPlaylists((prev) =>
                        prev.map((pl) =>
                          pl.id === playlist.id
                            ? { ...pl, movies: pl.movies.filter((m) => m.id !== movie.id) }
                            : pl
                        )
                      )
                    }
                    className="delete-movie"
                  >
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
            onAdd={(playlistId) => {
              addMovieToPlaylist(playlistId, selectedMovie);
              setIsPopupOpen(false);
            }}
            onClose={() => setIsPopupOpen(false)}
            position={popupPosition}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
