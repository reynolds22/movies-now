import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import "./movieDetails.css";

export default function MovieDetails({ addMovieToPlaylist, playlists }) {
  const { id, type } = useParams(); // `type` determines if it's a movie or TV show
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null); // State for selected playlist

  const API_KEY = "808196157aa973f359929571d9321e60";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const endpointType = type === "movie" ? "movie" : "tv"; // Ensure 'tv' is used for TV shows

        // Fetch Details
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}?api_key=${API_KEY}&language=en-US`
        );
        const detailsData = await detailsRes.json();
        console.log("Details Data:", detailsData); // Debug API response

        // Fetch Credits
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}/credits?api_key=${API_KEY}`
        );
        const creditsData = await creditsRes.json();
        console.log("Credits Data:", creditsData); // Debug API response

        // Fetch Videos
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/${endpointType}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videosData = await videosRes.json();

        // Update State
        setMovie(detailsData);
        setCast(creditsData.cast.slice(0, 10)); // Show top 10 cast members
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

  const handleAddToPlaylist = () => {
    if (selectedPlaylistId) {
      const standardizedMovie = {
        id: movie.id,
        title: movie.title || movie.name || "Untitled",
        poster_path: movie.poster_path || null,
        release_date: movie.release_date || movie.first_air_date || "N/A",
        vote_average: movie.vote_average || 0,
      };
  
      addMovieToPlaylist(selectedPlaylistId, standardizedMovie);
      setIsPopupOpen(false); // Close popup after adding
    }
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

      <div className="movie-banner">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "default.jpg" // Fallback for missing images
          }
          alt={movie.title || movie.name || "Image not available"}
        />
      </div>

      <div className="movie-info">
        <h1>{movie.title || movie.name || "Title not available"}</h1>
        <p>{movie.overview || "Description not available."}</p>

        <div className="movie-stats">
          <p>
            <FontAwesomeIcon icon={faStar} /> Rating:{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
          <p>
            Release Date:{" "}
            {movie.release_date || movie.first_air_date || "N/A"}
          </p>
        </div>

        <button
          className="add-to-playlist"
          onClick={() => setIsPopupOpen(true)} // Open popup
        >
          Add to Playlist
        </button>
      </div>

      {trailerKey && (
        <div className="movie-trailer">
          <h2>Trailer</h2>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}

      <div className="movie-cast">
        <h2>Cast</h2>
        <ul>
          {cast.map((member) => (
            <li key={member.id}>
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "default_profile.jpg" // Fallback for missing cast images
                }
                alt={member.name}
              />
              <p>{member.name}</p>
              <p>as {member.character}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Playlist Selection Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Select Playlist</h2>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <label>
                    <input
                      type="radio"
                      name="playlist"
                      value={playlist.id}
                      onChange={() => setSelectedPlaylistId(playlist.id)}
                    />
                    {playlist.name}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleAddToPlaylist}>Add</button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
