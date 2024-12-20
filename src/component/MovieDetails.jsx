import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import "./movieDetails.css";
import AddToPlaylistPopup from "./AddToPlaylistPopup";

export default function MovieDetails({ addMovieToPlaylist, playlists }) {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const API_KEY = "808196157aa973f359929571d9321e60";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const endpointType = type === "movie" ? "movie" : "tv";

        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}?api_key=${API_KEY}&language=en-US`
        );
        const detailsData = await detailsRes.json();
        setMovie(detailsData);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}/credits?api_key=${API_KEY}`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 10));

        const videosRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videosData = await videosRes.json();
        const trailer = videosData.results.find((video) => video.type === "Trailer");
        setTrailerKey(trailer?.key || null);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, type]);

  const handleOpenPopup = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    setIsPopupOpen(true);
  };

  const handleAddToPlaylist = (playlistId) => {
    const standardizedItem = {
      id: movie.id,
      title: movie.title || movie.name || "Untitled",
      poster_path: movie.poster_path || "default.jpg",
      release_date: movie.release_date || movie.first_air_date || "N/A",
      vote_average: movie.vote_average || 0,
    };
    addMovieToPlaylist(playlistId, standardizedItem);
    setIsPopupOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie details not found.</div>;
  }

  return (
    <div className="movie-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="poster-trailer">

        <div className="movie-banner">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "default.jpg"
            }
            alt={movie.title || movie.name || "Image not available"}
          />
        </div>

        <div className="details-right">
          <h1 className="movie-title">{movie.title || movie.name || "Title not available"}</h1>
          <div className="trailer-con">
            {trailerKey && (
              <div className="movie-trailer">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Trailer"
                ></iframe>
              </div>
            )}
          </div>
        </div> 

      </div>

      <div className="movie-info">
        <p>{movie.overview || "Description not available."}</p>

        <div className="movie-stats">
          <p>
            <FontAwesomeIcon icon={faStar} /> Rating:{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
          <p>
            Release Date: {movie.release_date || movie.first_air_date || "N/A"}
          </p>
        </div>

        <button
          className="add-to-playlist"
          onClick={(event) => handleOpenPopup(event)}
        >
          Add to Playlist
        </button>
      </div>

      <div className="movie-cast">
        <h2>Cast</h2>
        <ul>
          {cast.map((member) => (
            <li key={member.id}>
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "default_profile.jpg"
                }
                alt={member.name}
              />
              <p>{member.name}</p>
              <p>as {member.character}</p>
            </li>
          ))}
        </ul>
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
