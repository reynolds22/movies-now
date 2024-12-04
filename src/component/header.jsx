import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

function Header({ defaultSearchTerm = '', defaultSearchType = 'movie', toggleMenu }) {
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

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search Films or Shows"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

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
      <button className="menu-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

export default Header;
