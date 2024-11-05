import React, { useState } from "react";
import Carousel from "./carousel";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import NewTrailers from "./newMovies";
import "./styles.css";
import Header from "./header";
import Footer from "./Footer";
import SlidingMenu from "./SlidingMenu";

function MoviesNow({ playlists, addMovieToPlaylist }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container">
            <header>
                <Header toggleMenu={toggleMenu} />
            </header>
            <SlidingMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
            <div className="body">
                <div className="carousel-container">
                    <Carousel />
                    <div className="h1-Container">
                        <h1>Movies Now</h1>
                    </div>
                </div>

                {/* Movie Cards with playlists and addMovieToPlaylist passed as props */}
                <MovieCard title="In Theaters Now" category="now_playing" playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Upcoming Movies" category="upcoming" pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Action Movies" genreId={28} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />

                <NewTrailers trailerIndex={0} />

                <MovieCard title="Comedy Movies" genreId={35} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Trending" category="popular" playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Superhero Movies" keyword="9715" pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />

                <NewTrailers trailerIndex={1} />

                <MovieCard title="Horror Movies" genreId={27} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Animated Movies" genreId={16} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Sci-Fi Movies" genreId={878} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />

                <NewTrailers trailerIndex={2} />

                {/* TV Cards with playlists and addMovieToPlaylist passed as props */}
                <TvCard title="Popular TV Shows" category="popular" pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <TvCard title="Comedy TV Shows" genreId={35} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <TvCard title="Drama TV Shows" genreId={18} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <TvCard title="Action & Adventure TV Shows" genreId={10759} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <TvCard title="Sci-Fi & Fantasy TV Shows" genreId={10765} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />

                <NewTrailers trailerIndex={3} />

                <MovieCard title="Adventure" genreId={878} pages={3} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Family" genreId={10751} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Documentary" genreId={99} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
                <MovieCard title="Drama Movies" genreId={18} pages={2} playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default MoviesNow;


// make playlist view able
// make playlist have a edit 
// in playlist edit edit button changes to done
// - while in this mode have a delete button
// - change pic
// - change name 
// - change description
// - move content around
// - have a togle so playlist can have a 1st to last togle numbered
// - delete movie option
// each movie card is clickable
// figure out movies layout 
// css stuff
//  -
//  -
//  -
// responsive stuff
