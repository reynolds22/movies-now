import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";
import MovieCard from "./MovieCard";

function MoviesNow(){

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
                    <MovieCard title="In Theaters Now" category="now_playing" />
                    <MovieCard title="Upcoming Movies" category="upcoming" pages={2}/>
                    <MovieCard title="Action Movies" genreId={28} pages={3} /> 
                    <MovieCard title="Comedy Movies" genreId={35} pages={3} /> 

                    <MovieCard title="Trending" category="popular" />
                    <MovieCard title="Horror Movies" genreId={27} pages={3} /> 
                    <MovieCard title="Animated Movies" genreId={16} pages={3} /> 
                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 

                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 
                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 
                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 
                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 
                </div>
        </div>
    );
};

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

// new shows
// most popular

// superhero, Adventure, Family, 

// Romance, Anime, Sitcom, War, Fantasy, Drama

// thriller, crime, Mystery, Documentary, Disaster

// christmas, holloween, sports, video game

export default MoviesNow;