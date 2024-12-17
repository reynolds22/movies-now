import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddToPlaylistPopup from "./AddToPlaylistPopup";
import "./PlaylistDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faStar } from "@fortawesome/free-solid-svg-icons";

export default function PlaylistDetail({
  playlists,
  setPlaylists,
  addMovieToPlaylist,
  addShowToPlaylist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const playlist = playlists.find((pl) => pl.id === parseInt(id));
  if (!playlist) {
    return <p>Playlist not found</p>;
  }
  
  // Handle Drag Start
  const handleDragStart = (index) => {
    if (!isEditMode) return;
    setDraggedItemIndex(index);
  };

  // Handle Drag Over
  const handleDragOver = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
  };

  // Handle Drop
  const handleDrop = (dropIndex, type) => {
    if (
      !isEditMode ||
      draggedItemIndex === null ||
      draggedItemIndex === dropIndex
    )
      return;

    const updatedItems = [...playlist[type]];
    const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);

    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlist.id ? { ...pl, [type]: updatedItems } : pl
      )
    );
    setDraggedItemIndex(null);
  };

  // Save the current first movie as the playlist image
  const handleSaveImage = () => {
    if (playlist.movies.length > 0) {
      const firstMovie = playlist.movies[0];
      const newImage = `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`;
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.id === playlist.id ? { ...pl, image: newImage } : pl
        )
      );
    } else {
      alert("No movies in the playlist to set as an image.");
    }
  };

  // Delete Playlist
  const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (confirmDelete) {
      setPlaylists(playlists.filter((pl) => pl.id !== playlist.id));
      navigate("/playlists");
    }
  };

  // Open Add to Playlist Popup
  const handleOpenPopup = (show, event) => {
    console.log("Opening popup for show:", show); // Debugging
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    setSelectedItem(show);
    setIsPopupOpen(true);
  };
  
  // Handle Card Click
  const handleCardClick = (item) => {
    navigate(`/details/${item.type}/${item.id}`);
  };
      
  return (
    <div>
      <div className="playlist-detail">
        <div className="top-bar">
          <button onClick={() => navigate(-1)} className="back-arrow">
            ← Back
          </button>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="edit-button"
          >
            {isEditMode ? "Done" : "Edit"}
          </button>
        </div>

        <div className="playlist-info">
          <img
            className="playlist-image"
            src={playlist.image || "default.jpg"}
            alt="Add movies/shows!"
          />
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>

          {isEditMode && (
            <div className="action-buttons">
              <button onClick={handleSaveImage} className="save-img-button">
                Save Playlist Image
              </button>
              <button
                onClick={handleDeletePlaylist}
                className="delete-playlist-button"
              >
                Delete Playlist
              </button>
            </div>
          )}

          {isEditMode && (
            <>
              <div className="info-box left-info">
                <p>
                  Use the <strong>Save Playlist Image</strong> button to save
                  the first movie's image as the playlist cover.
                </p>
              </div>
              <div className="info-box right-info">
                <p>
                  Drag and drop movies or shows to rearrange their order. This
                  feature is only available in edit mode.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="playlist-movies">
          {/* Render Movies */}
          {playlist.movies.map((movie, index) => (
            <div
              key={`movie-${movie.id}`}
              className="film-card"
              draggable={isEditMode}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index, "movies")}
              onClick={() => handleCardClick(movie, "movie")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <h3>{movie.title || movie.name}</h3>
              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaylists((prev) =>
                      prev.map((pl) =>
                        pl.id === playlist.id
                          ? {
                              ...pl,
                              movies: pl.movies.filter(
                                (m) => m.id !== movie.id
                              ),
                            }
                          : pl
                      )
                    );
                  }}
                  className="add-movie"
                >
                  Delete Movie
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPopup(movie, e);
                }}
                className="add-movie"
              >
                <FontAwesomeIcon className="list-img" icon={faList} />
                <p>Add to Playlist</p>
              </button>
              <div className="stars">
                <p className="p1">
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "N/A"}
                </p>
                <div className="p2">
                  <FontAwesomeIcon id="rate-star" icon={faStar} />
                  <p>
                    {movie.vote_average
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Render Shows */}
          {playlist.shows?.map((show, index) => (
            <div
              key={`show-${show.id}`}
              className="film-card"
              draggable={isEditMode}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index, "shows")}
              onClick={() => handleCardClick(show, "tv")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.title || show.name || "Show Image"}
              />
              <h3>{show.title || show.name}</h3>
              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaylists((prev) =>
                      prev.map((pl) =>
                        pl.id === playlist.id
                          ? {
                              ...pl,
                              shows: pl.shows.filter((s) => s.id !== show.id),
                            }
                          : pl
                      )
                    );
                  }}
                  className="add-movie"
                >
                  Delete Show
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPopup(show, e);
                }}
                className="add-movie"
              >
                <FontAwesomeIcon className="list-img" icon={faList} />
                <p>Add to Playlist</p>
              </button>
              <div className="stars">
                <p className="p1">
                  {show.first_air_date
                    ? show.first_air_date.slice(0, 4)
                    : "N/A"}
                </p>
                <div className="p2">
                  <FontAwesomeIcon id="rate-star" icon={faStar} />
                  <p>
                    {show.vote_average
                      ? show.vote_average.toFixed(1)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))} 
        </div>

        {isPopupOpen && (
          <AddToPlaylistPopup
          playlists={playlists}
          onAdd={(playlistId) => {
            if (selectedItem?.first_air_date) {
              addShowToPlaylist(playlistId, selectedItem); // This must be correctly passed
            } else {
              addMovieToPlaylist(playlistId, selectedItem);
            }
            setIsPopupOpen(false);
          }}
          onClose={() => setIsPopupOpen(false)}
          position={popupPosition}
        />
        )}
      </div>
    </div>
  );
}
