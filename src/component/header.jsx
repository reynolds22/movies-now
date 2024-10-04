import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Header({ defaultSearchTerm = '', defaultSearchType = 'movie' }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [searchType, setSearchType] = useState(defaultSearchType); // "movie" or "show"

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}/${searchType}`);
    }
  };

  return (
    <header>
      <button className="icon-film" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faFilm} />
      </button>
      <span>|</span>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search Films or Shows"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {/* Toggle Buttons for Search Type */}
        <div className="search-togles">
          <button
            type="button"
            className={`search-togle-m ${searchType === 'movie' ? 'active' : ''}`}
            onClick={() => setSearchType('movie')}
          >
            Movie
          </button>
          <button
            type="button"
            className={`search-togle-s ${searchType === 'show' ? 'active' : ''}`}
            onClick={() => setSearchType('show')}
          >
            Show
          </button>
        </div>
      </form>

      <span>|</span>
      <button className="sign-in" onClick={() => navigate('/sign-in')}>Sign In</button>
      <button className="menu-button">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

export default Header;
