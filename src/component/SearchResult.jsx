import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import "./Header.css";
import AddToPlaylistPopup from "./AddToPlaylistPopup";
import "./SearchResult.css"; 

function SearchResult({ playlists, addMovieToPlaylist, addShowToPlaylist }) {
  const { query, type } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const API_KEY = "808196157aa973f359929571d9321e60";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const endpointType = type === "movie" ? "movie" : "tv";
        const url = `https://api.themoviedb.org/3/search/${endpointType}?api_key=${API_KEY}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched search results:", data.results);
          setResults(data.results || []);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, type]);

  const handleCardClick = (item) => {
    navigate(`/details/${type}/${item.id}`);
  };

  const handleOpenPopup = (item, button) => {
    const buttonRect = button.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleAddToPlaylist = (playlistId) => {
    console.log("Selected Item before adding:", selectedItem);
  
    if (type === "tv" || selectedItem.first_air_date) {
      console.log("Adding TV show to playlist");
      const standardizedShow = {
        id: selectedItem.id,
        type: "tv",
        title: selectedItem.name || selectedItem.title || "Untitled Show",
        poster_path: selectedItem.poster_path || null,
        release_date: selectedItem.first_air_date || "N/A",
        vote_average: selectedItem.vote_average || 0,
        original_language: selectedItem.original_language || "N/A",
        genre_ids: selectedItem.genre_ids || [],
        overview: selectedItem.overview || "",
        backdrop_path: selectedItem.backdrop_path || null,
      };
      console.log("Invoking addShowToPlaylist with:", playlistId, standardizedShow);
      addShowToPlaylist(playlistId, standardizedShow);
    } else if (type === "movie" || selectedItem.release_date) {
      console.log("Adding movie to playlist");
      const standardizedMovie = {
        id: selectedItem.id,
        type: "movie",
        title: selectedItem.title || "Untitled Movie",
        poster_path: selectedItem.poster_path || null,
        release_date: selectedItem.release_date || "N/A",
        vote_average: selectedItem.vote_average || 0,
        original_language: selectedItem.original_language || "N/A",
        genre_ids: selectedItem.genre_ids || [],
        overview: selectedItem.overview || "",
        backdrop_path: selectedItem.backdrop_path || null,
      };
      console.log("Invoking addMovieToPlaylist with:", playlistId, standardizedMovie);
      addMovieToPlaylist(playlistId, standardizedMovie);
    } else {
      console.error("Unknown type for selected item:", selectedItem);
    }
  
    setIsPopupOpen(false); // Close popup after adding
  };
          
  return (
    <div>
      <div className="search-results-container">
        <h1>
          Search Results for: {query} ({type === "movie" ? "Movies" : "TV Shows"})
        </h1>
        <div className="results-list">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className="film-card"
                onClick={() => handleCardClick(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <h3>{item.title || item.name}</h3>
                <button
                  className="add-movie"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPopup(item, e.target);
                  }}
                >
                  <FontAwesomeIcon className="list-img" icon={faList} />
                  <p>Add {type === "movie" ? "Movie" : "Show"}</p>
                </button>
                <div className="stars">
                  <p className="p1">
                    {item.release_date
                      ? item.release_date.slice(0, 4)
                      : item.first_air_date
                      ? item.first_air_date.slice(0, 4)
                      : "N/A"}
                  </p>
                  <div className="p2">
                    <FontAwesomeIcon id="rate-star" icon={faStar} />
                    <p>{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <AddToPlaylistPopup
          playlists={playlists}
          onAdd={handleAddToPlaylist}
          onClose={() => setIsPopupOpen(false)}
          position={popupPosition}
        />
      )} 

      <Footer className="footer-help" />
    </div>
  );
}

export default SearchResult;
