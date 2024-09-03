import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";

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
                    <MovieCard title="Superhero Movies" keyword="9715" pages={2} />

                    <MovieCard title="Horror Movies" genreId={27} pages={3} /> 
                    <MovieCard title="Animated Movies" genreId={16} pages={3} /> 
                    <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 
                    
                    <TvCard title="Popular TV Shows" category="popular" pages={2}/>
                    <TvCard title="Comedy TV Shows" genreId={35} pages={2}/>
                    <TvCard title="Drama TV Shows" genreId={18} pages={2}/>
                    <TvCard title="Action & Adventure TV Shows" genreId={10759} pages={2}/>
                    <TvCard title="Sci-Fi & Fantasy TV Shows" genreId={10765} pages={2}/>
                    <MovieCard title="Adventure" genreId={878} pages={3} /> 
                    <MovieCard title="Family" genreId={10751} pages={2} />
                    <MovieCard title="Documentary" genreId={99} pages={2} />
                    <MovieCard title="Drama Movies" genreId={18} pages={2} />
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


// christmas, holloween, sports, video game

export default MoviesNow;