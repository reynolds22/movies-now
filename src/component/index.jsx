import React, {useState, useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";

function MoviesNow(){

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchMovie = async() => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=808196157aa973f359929571d9321e60&query=Inception`); 
                setMovie(response.data.results[0]);
            } catch (err){
                setError(err);
            }
        }; 
        fetchMovie();
    },[]);

    if (error) return <div>Error fetching movie data</div>;
    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container">
            <header>
                <button className="icon-film">
                    <FontAwesomeIcon icon={faFilm} />
                </button>
                <span>|</span>
                <input placeholder="Search Films"/> 
                <button className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>    
                <span>|</span>
                <button className="sign-in">Sign In</button>
                <button className="menu-button">                    
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </header>
            <body>
                <Carousel/>
                <h1>MOVIES NOW</h1>
            </body>
        </div>
    );
};
export default MoviesNow;