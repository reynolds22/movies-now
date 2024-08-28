import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";

const API_Key = '808196157aa973f359929571d9321e60';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

function MoviesNow(){

    const [popular, setPopular] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("useEffect triggered");
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/popular?api_key=${API_Key}`);

                if (!response.ok) {
                    throw new Error('Network response was not it.');
                }

                const data = await response.json();
                console.log("Data received:", data);
                setPopular(data.results);
                setIsLoading(false);
            } 
            catch (err) {
                console.error('Failed to get movies:', err);
            }
        };
        fetchMovies(); 
    }, []);

    if (isLoading){
        return <div>Loading...</div>
    }
    
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
            <div>
                <div className="carousel-container">
                    <Carousel/>
                    <div className="h1-Container">
                        <h1>Movies Now</h1>
                    </div>
                </div>
                {/* <div className="Popular-movies">
                    {popular.map((film)=>(
                        <div className="film-picture">
                            {film.original_title}
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                alt={film.original_title}
                            />
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

// - component for cards
// - components for movies category lists with 60+ movies.
// - log in card
// - sign up
// - playlists overview/view or del
// - look/edit playlist
// - search
// - home button
// - tripple bar
//      - setting
//      - travel buttons
//      - account info
// - playlist add pop up
// - movie card
// - footer stuff
// - stars

// trending, new releases, upcoming, in theaters

// action, comedy, horror, Sci-Fi, 3d animated
// superhero, Adventure, Family, 2d animated
// Romance, Anime, Sitcom, War, Fantasy, Drama

// thriller, crime, Mystery, Documentary, Disaster

// christmas, holloween, sports, video game

export default MoviesNow;