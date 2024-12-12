import React, { useState, useEffect } from "react";
import "./TvCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faStar } from "@fortawesome/free-solid-svg-icons";
import AddToPlaylistPopup from "./AddToPlaylistPopup";
import { useNavigate } from "react-router-dom";

const API_Key = "808196157aa973f359929571d9321e60";
const TV_BASE_URL = "https://api.themoviedb.org/3/tv";
const TV_DISCOVER_URL = "https://api.themoviedb.org/3/discover/tv";

function TvCard({ title, category, pages = 1, genreId, keyword, playlists, addShowToPlaylist }) {
    const [shows, setShows] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedShow, setSelectedShow] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchShows = async () => {
            let allShows = [];
            for (let page = 1; page <= pages; page++) {
                try {
                    const url = genreId || keyword
                        ? `${TV_DISCOVER_URL}?api_key=${API_Key}&page=${page}&with_genres=${genreId || ""}&with_keywords=${keyword || ""}`
                        : `${TV_BASE_URL}/${category}?api_key=${API_Key}&page=${page}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.results) allShows = [...allShows, ...data.results];
                } catch (err) {
                    console.error("Error fetching shows:", err);
                }
            }
            setShows(allShows);
        };
        fetchShows();
    }, [category, pages, genreId, keyword]);

    const handleCardClick = (show) => {
        navigate(`/details/tv/${show.id}`);
    };

    const handleOpenPopup = (show, event) => {
        const buttonRect = event.target.getBoundingClientRect();
        setPopupPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX,
        });
        setSelectedShow(show);
        setIsPopupOpen(true);
    };

    const handleAddToPlaylist = (playlistId) => {
        if (selectedShow) {
          const standardizedShow = {
            id: selectedShow.id,
            name: selectedShow.name || "Untitled Show",
            poster_path: selectedShow.poster_path || null,
            first_air_date: selectedShow.first_air_date || "N/A",
            vote_average: selectedShow.vote_average || 0,
          };
      
          console.log("Adding selected show to playlist:", standardizedShow); // Debugging
          addShowToPlaylist(playlistId, standardizedShow);
          setIsPopupOpen(false);
        }
      };
            
    return (
        <div className="tv-card-container">
            <h2>{title}</h2>
            <div className="Popular-tv">
                {shows.map((show, index) => (
                    <div
                        className="film-card"
                        key={`${title}-${index}-${show.id}`}
                        onClick={() => handleCardClick(show)}
                    >
                        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                        <h3>{show.name}</h3>
                        <button
                            className="add-movie"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPopup(show, e);
                            }}
                        >
                            <FontAwesomeIcon className="list-img" icon={faList} />
                            <p>Add to Playlist</p>
                        </button>
                        <div className="stars">
                            <p className="p1">{show.first_air_date ? show.first_air_date.slice(0, 4) : "N/A"}</p>
                            <div className="p2">
                                <FontAwesomeIcon id="rate-star" icon={faStar} />
                                <p>{show.vote_average ? show.vote_average.toFixed(1) : "N/A"}</p>
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

export default TvCard;
