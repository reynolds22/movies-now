import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faStar } from '@fortawesome/free-solid-svg-icons';
import Header from './header';
import Footer from './Footer';
import AddToPlaylistPopup from './AddToPlaylistPopup'; 
import "./SearchResult.css";

function SearchResult({ playlists, addMovieToPlaylist }) {
  const { query, type } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const API_KEY = "808196157aa973f359929571d9321e60";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setResults(data.results || []);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, type]);

  const handleOpenPopup = (movie, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopupPosition({ 
      top: buttonRect.bottom + window.scrollY, 
      left: buttonRect.left + window.scrollX 
    });
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  const handleAddToPlaylist = (playlistId) => {
    addMovieToPlaylist(playlistId, selectedMovie);
    setIsPopupOpen(false); // Close the popup after adding
  };

  return (
    <div>
      <Header />

      <div className="search-results-container">
        <h1>Search Results for: {query} ({type === "movie" ? "Movies" : "TV Shows"})</h1>
        <div className="results-list">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} className="search-result-item">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                  alt={item.title || item.name} 
                />
                <h3>{item.title || item.name}</h3> 
                <button className="add-movie" onClick={(e) => handleOpenPopup(item, e)}>
                  <FontAwesomeIcon className="list-img" icon={faList} />
                  <p>Add {type === "movie" ? "Movie" : "Show"}</p>
                </button>
                <div className="move-info">
                  <p className='p1'>
                    {item.release_date 
                      ? item.release_date.slice(0, 4) 
                      : item.first_air_date 
                        ? item.first_air_date.slice(0, 4) 
                        : "N/A"}
                  </p>
                  <div className="move-rate">
                    <FontAwesomeIcon id="rate-star" icon={faStar} />
                    <p className='p2'>{item.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </div>
      </div>

      {/* Popup for adding to playlist */}
      {isPopupOpen && (
        <AddToPlaylistPopup
          playlists={playlists}
          onAdd={handleAddToPlaylist}
          onClose={() => setIsPopupOpen(false)}
          position={popupPosition}
        />
      )}

      <Footer />
    </div>
  );
}

export default SearchResult;
