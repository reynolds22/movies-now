import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Carousel from "./carousel";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import NewTrailers from "./newMovies";
import { faInstagram, faFacebook, faXTwitter, faTwitch, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
                <div className="ze-logo">
                    <FontAwesomeIcon icon={faFilm} className="the-logo" />
                    <h3>Movies Now</h3>
                </div>
                <div className="pro-sources">
                    <h3>Project Sources</h3>
                    <hr/>
                    <ul>
                        <li>TMDB - API for movie info</li>
                        <li>YouTube API - For trailers</li>
                        <li>Google Fonts - For fonts</li>
                        <li>Font Awsome - For icons</li>
                        <li>ChatGPT - For learning</li>
                        <li>Other movie platforms - For UI inspiration</li>
                    </ul>
                </div>
                <div>
                    <h3>Social</h3>
                    <hr/>
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faInstagram} className="icons"/>
                        <FontAwesomeIcon icon={faFacebook} className="icons"/>
                        <FontAwesomeIcon icon={faXTwitter} className="icons"/>
                        <FontAwesomeIcon icon={faTwitch} className="icons"/>
                        <FontAwesomeIcon icon={faTiktok} className="icons"/>
                        <FontAwesomeIcon icon={faYoutube} className="icons"/>
                    </div>
                </div>
                <div>
                    <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        &#8593; back to top &#8593;
                    </button>
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

export default MoviesNow;