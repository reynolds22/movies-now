import React, { useState, useEffect } from "react";
import "./movieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faStar } from "@fortawesome/free-solid-svg-icons";
import AddToPlaylistPopup from "./AddToPlaylistPopup";
import { useNavigate } from "react-router-dom";

const API_Key = "808196157aa973f359929571d9321e60";
const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
const CATEGORY_URL = "https://api.themoviedb.org/3/movie";

export default function MovieCard({
  title,
  category,
  pages = 1,
  genreId,
  keyword,
  playlists,
  addMovieToPlaylist,
}) {
  const [movies, setMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      for (let page = 1; page <= pages; page++) {
        try {
          const url = genreId || keyword
            ? `${DISCOVER_URL}?api_key=${API_Key}&page=${page}&with_genres=${genreId || ""}&with_keywords=${keyword || ""}`
            : `${CATEGORY_URL}/${category}?api_key=${API_Key}&page=${page}`;
          const response = await fetch(url);
          const data = await response.json();
          if (data.results) allMovies = [...allMovies, ...data.results];
        } catch (err) {
          console.error("Error fetching movies:", err);
        }
      }
      setMovies(allMovies);
    };
    fetchMovies();
  }, [category, pages, genreId, keyword]);

  const handleCardClick = (movie) => {
    navigate(`/details/movie/${movie.id}`);
  };

  const handleOpenPopup = (movie, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  const handleAddToPlaylist = (playlistId) => {
    addMovieToPlaylist(playlistId, selectedMovie);
    setIsPopupOpen(false);
  };

  return (
    <div className="card-container">
      <h2>{title}</h2>
      <div className="Popular-movies">
        {movies.map((movie, index) => (
          <div
            className="film-card"
            key={`${movie.id}-${index}`}
            onClick={() => handleCardClick(movie)}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button
              className="add-movie"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPopup(movie, e);
              }}
            >
              <FontAwesomeIcon className="list-img" icon={faList} />
              <p>Add Movie</p>
            </button>
            <div className="stars">
              <p className="p1">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
              <div className="p2">
                <FontAwesomeIcon id="rate-star" icon={faStar} />
                <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div> 
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
