import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import NewTrailers from "./newMovies";

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
            <div className="body">
                <div className="carousel-container">
                    <Carousel/>
                    <div className="h1-Container">
                        <h1>Movies Now</h1>
                    </div>
                </div>
                <MovieCard title="In Theaters Now" category="now_playing" />
                <MovieCard title="Upcoming Movies" category="upcoming" pages={2}/>
                <MovieCard title="Action Movies" genreId={28} pages={3} /> 

                <NewTrailers trailerIndex={0}/>

                <MovieCard title="Comedy Movies" genreId={35} pages={3} /> 
                <MovieCard title="Trending" category="popular" />
                <MovieCard title="Superhero Movies" keyword="9715" pages={2} />

                <NewTrailers trailerIndex={1}/>

                <MovieCard title="Horror Movies" genreId={27} pages={3} /> 
                <MovieCard title="Animated Movies" genreId={16} pages={3} /> 
                <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} /> 

                <NewTrailers trailerIndex={2}/>

                <TvCard title="Popular TV Shows" category="popular" pages={2}/>
                <TvCard title="Comedy TV Shows" genreId={35} pages={2}/>
                <TvCard title="Drama TV Shows" genreId={18} pages={2}/>
                <TvCard title="Action & Adventure TV Shows" genreId={10759} pages={2}/>
                <TvCard title="Sci-Fi & Fantasy TV Shows" genreId={10765} pages={2}/>

                <NewTrailers trailerIndex={3}/>

                <MovieCard title="Adventure" genreId={878} pages={3} /> 
                <MovieCard title="Family" genreId={10751} pages={2} />
                <MovieCard title="Documentary" genreId={99} pages={2} />
                <MovieCard title="Drama Movies" genreId={18} pages={2} />
            </div>
            <footer>
                <div>
                    <h3>Sources for making Movies now</h3>
                    <hr/>
                </div>
                <div>
                    <h3>Sociols</h3>
                    <hr/>
                </div>
                <div>
                    <h3>Sociols</h3>
                    <hr/>
                </div>
                <div>
                    <h3>back to top^</h3>
                    <hr/>
                </div>
                <div>
                    <h3>logo</h3>
                    <hr/>
                </div>
            </footer>
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
//      - to the tv section, to the movie section, to the bottom
//      - setting
//      - travel buttons
//      - account info
// - playlist add pop up
// - clicked movie card
// - footer stuff

export default MoviesNow;