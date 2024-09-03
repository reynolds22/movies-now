import React, {useState, useEffect} from "react";
import "./movieCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faStar } from '@fortawesome/free-solid-svg-icons';

const API_Key = '808196157aa973f359929571d9321e60';
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';
const CATEGORY_URL = 'https://api.themoviedb.org/3/movie';

export default function MovieCard({title, category, pages = 1, genreId, keyword}){ 

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            let allMovies = [];

            for (let page = 1; page <= pages; page++) {
                try {
                    let url;
                    if (genreId || keyword) {
                        url = `${DISCOVER_URL}?api_key=${API_Key}&page=${page}`;
                        if (genreId) {
                            url += `&with_genres=${genreId}`;
                        }
                        if (keyword) {
                            url += `&with_keywords=${keyword}`;
                        }
                    } 
                    else {
                        url = `${CATEGORY_URL}/${category}?api_key=${API_Key}&page=${page}`;
                    }

                    const response = await fetch(url);
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
    
                    const data = await response.json();
                    allMovies = [...allMovies, ...data.results];
                } 
                catch (err) {
                    console.error(`Failed to fetch movies:`, err);
                }
                setMovies(allMovies);
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, [category, pages, genreId, keyword]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card-container">
            <h2>{title}</h2>
            <div className="Popular-movies">
                {movies.map((film)=>(
                    <div className="film-card">
                        <button className="add-movie">   
                            <FontAwesomeIcon className="list-img" icon={faList} />
                            <p>Add Movie</p>               
                        </button>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.original_title}
                        /> 
                        <h3>{film.original_title}</h3>
                        <div className="stars">
                            <FontAwesomeIcon icon={faStar} />
                            <p>{film.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};