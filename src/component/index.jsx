import React, { useState } from "react";
import Carousel from "./carousel";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import NewTrailers from "./newMovies";
import "./styles.css";
import Header from "./header";
import SlidingMenu from "./SlidingMenu";

function MoviesNow({ playlists, setPlaylists, addMovieToPlaylist }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const addShowToPlaylist = (playlistId, show) => {
        console.log("Adding show:", show);
        console.log("To playlist ID:", playlistId);
    
        const updatedPlaylists = playlists.map((playlist) => {
            if (playlist.id === playlistId) {
                console.log("Updating playlist:", playlist.name);
                const updatedShows = playlist.shows ? [...playlist.shows, show] : [show];
                return { ...playlist, shows: updatedShows };
            }
            return playlist;
        }); 
    
        console.log("Updated playlists:", updatedPlaylists);
        setPlaylists(updatedPlaylists); // Update playlists state
    };
    
    return (
        <div className="container">
            <Header toggleMenu={toggleMenu} />
            <SlidingMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
            <div className="body">
                <div className="carousel-container">
                    <Carousel />
                    <div className="h1-Container">
                        <h1>Movies Now</h1>
                    </div>
                </div>

                {/* Movie Cards */}
                <MovieCard
                    title="In Theaters Now"
                    category="now_playing"
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Upcoming Movies"
                    category="upcoming"
                    pages={2}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Action Movies"
                    genreId={28}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />

                <NewTrailers trailerIndex={0} />

                <MovieCard
                    title="Comedy Movies"
                    genreId={35}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Trending"
                    category="popular"
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Superhero Movies"
                    keyword="9715"
                    pages={2}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />

                <NewTrailers trailerIndex={1} />

                <MovieCard
                    title="Horror Movies"
                    genreId={27}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Animated Movies"
                    genreId={16}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Sci-Fi Movies"
                    genreId={878}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />

                <NewTrailers trailerIndex={2} />

                {/* TV Cards */}
                <TvCard
                    title="Popular TV Shows"
                    category="popular"
                    pages={2}
                    playlists={playlists}
                    addShowToPlaylist={addShowToPlaylist}
                />
                <TvCard
                    title="Comedy TV Shows"
                    genreId={35}
                    pages={2}
                    playlists={playlists}
                    addShowToPlaylist={addShowToPlaylist}
                />
                <TvCard
                    title="Drama TV Shows"
                    genreId={18}
                    pages={2}
                    playlists={playlists}
                    addShowToPlaylist={addShowToPlaylist}
                />
                <TvCard
                    title="Action & Adventure TV Shows"
                    genreId={10759}
                    pages={2}
                    playlists={playlists}
                    addShowToPlaylist={addShowToPlaylist}
                />
                <TvCard
                    title="Sci-Fi & Fantasy TV Shows"
                    genreId={10765}
                    pages={2}
                    playlists={playlists}
                    addShowToPlaylist={addShowToPlaylist}
                />

                <NewTrailers trailerIndex={3} />

                <MovieCard
                    title="Adventure"
                    genreId={878}
                    pages={3}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Family"
                    genreId={10751}
                    pages={2}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Documentary"
                    genreId={99}
                    pages={2}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
                <MovieCard
                    title="Drama Movies"
                    genreId={18}
                    pages={2}
                    playlists={playlists}
                    addMovieToPlaylist={addMovieToPlaylist}
                />
            </div>
        </div>
    );
}
 
export default MoviesNow;
