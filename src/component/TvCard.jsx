import React, { useState, useEffect } from "react";
import "./TvCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faStar } from '@fortawesome/free-solid-svg-icons';

const API_Key = '808196157aa973f359929571d9321e60';
const TV_BASE_URL = 'https://api.themoviedb.org/3/tv';
const TV_DISCOVER_URL = 'https://api.themoviedb.org/3/discover/tv';

function TvCard({ title, category, pages = 1, genreId, keyword }){

    const [shows, setShows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            const fetchShows = async () => {
                setIsLoading(true);
                let allShows = [];

                for (let page = 1; page <= pages; page++) {
                    try{
                        let url;
                        if (genreId || keyword) {
                            url = `${TV_DISCOVER_URL}?api_key=${API_Key}&page=${page}`;
                            if (genreId) {
                                url += `&with_genres=${genreId}`;
                            }
                            if (keyword) {
                                url += `&with_keywords=${keyword}`;
                            }
                        } 
                        else {
                            url = `${TV_BASE_URL}/${category}?api_key=${API_Key}&page=${page}`;
                        }

                        const response = await fetch(url);

                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }

                        const data = await response.json();
                        allShows = [...allShows, ...data.results];
                    } 
                    catch (err) {
                        console.error(`Failed to fetch TV shows:`, err);
                    }
                };
                setShows(allShows);
                setIsLoading(false);        
            };
            fetchShows();

        }, [category, pages, genreId, keyword]);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="tv-card-container">
                <h2>{title}</h2>
                <div className="Popular-tv">
                    {shows.map((show, index) => (
                        <div className="tv-film-card" key={`${show.id}-${index}`}>
                            <img  
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                            /> 
                            <h3>{show.name}</h3>
                            <button className="add-tv">   
                                <FontAwesomeIcon className="list-img" icon={faList} />
                                <p>Add Show</p>               
                            </button>
                            <div className="stars">
                                <p className='p1'>
                                    {show.first_air_date ? show.first_air_date.slice(0, 4) : "N/A"}
                                </p>
                                <div className="p2">
                                    <FontAwesomeIcon id="rate-star" icon={faStar} />
                                    <p>{show.vote_average.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
export default TvCard;