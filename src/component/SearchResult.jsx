import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Consolidated imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faXTwitter, faTwitch, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "./SearchResult.css";
import { faStar } from '@fortawesome/free-solid-svg-icons';

function SearchResult() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { query } = useParams();  // Get the search query from the URL
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "808196157aa973f359929571d9321e60";
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Fetch movies
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        const movieData = await movieResponse.json();
  
        // Fetch TV shows
        const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`);
        const tvData = await tvResponse.json();
  
        // Combine movie and TV results
        const combinedResults = [...movieData.results, ...tvData.results];
        setResults(combinedResults);  // Set the combined results in state
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };
  
    fetchSearchResults();
  }, [query]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };    

  const goToHome = () => {
    navigate("/", { replace: true });  // Navigate to the main page
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to the top
  };

  return (
    <div>
      <header>
        <button className="icon-film" onClick={goToHome}>
          <FontAwesomeIcon icon={faFilm} />
        </button>
        <span>|</span>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Search Films"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <span>|</span>
        <button className="sign-in">Sign In</button>
        <button className="menu-button">                    
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <div className="search-results-container">
        <h1>Search Results for: {query}</h1>
        <div className="results-list">
          {results.length > 0 
            ? (results.map((item) => (
                <div key={item.id} className="search-result-item">
                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
                    <h3>{item.title || item.name}</h3> 
                    <div className="move-info">
                        <p className='p1'>{item.release_date ? item.release_date.slice(0, 4) : item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"}</p>
                        <div className="move-rate">
                            <FontAwesomeIcon id="rate-star" icon={faStar} />
                            <p className='p2'>{item.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            ))) 
            : (<p>No results found for "{query}".</p>)
          }
        </div>
      </div>
      <footer>
        <div className="ze-logo">
            <FontAwesomeIcon icon={faFilm} className="the-logo" />
            <h3>Movies Now</h3>
        </div>
        <div className="pro-sources">
            <h3>Project Sources</h3>
            <hr/>
            <ul>
                <li>TMDB - API for movie info</li>
                <li>YouTube API - For trailers</li>
                <li>Google Fonts - For fonts</li>
                <li>Font Awsome - For icons</li>
                <li>ChatGPT - For learning</li>
                <li>Other movie platforms - For UI inspiration</li>
            </ul>
        </div>
        <div>
            <h3>Social</h3>
            <hr/>
            <div className="social-icons">
                <FontAwesomeIcon icon={faInstagram} className="icons"/>
                <FontAwesomeIcon icon={faFacebook} className="icons"/>
                <FontAwesomeIcon icon={faXTwitter} className="icons"/>
                <FontAwesomeIcon icon={faTwitch} className="icons"/>
                <FontAwesomeIcon icon={faTiktok} className="icons"/>
                <FontAwesomeIcon icon={faYoutube} className="icons"/>
            </div>
        </div>
        <div>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                &#8593; back to top &#8593;
            </button>
        </div>
      </footer>
    </div>
  );
}

export default SearchResult;
