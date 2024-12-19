import React, { useState, useEffect } from "react";
import "./newMovies.css";

const API_Key = '808196157aa973f359929571d9321e60';
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming`;
const VIDEOS_URL = 'https://api.themoviedb.org/3/movie';

function MovieCard({ trailerIndex }) {
    const [trailers, setTrailers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingMoviesAndTrailers = async () => {
            try {
                const response = await fetch(`${UPCOMING_URL}?api_key=${API_Key}`);
                const data = await response.json();
                const upcomingMovies = data.results.slice(0, 5); // Limit to 5 movies

                const movieTrailerPromises = upcomingMovies.map(async (movie) => {
                    const trailerResponse = await fetch(`${VIDEOS_URL}/${movie.id}/videos?api_key=${API_Key}`);
                    const trailerData = await trailerResponse.json();
                    const trailer = trailerData.results.find((video) => video.type === "Trailer");
                    return { ...movie, trailer };
                });

                const trailersWithVideos = await Promise.all(movieTrailerPromises);
                setTrailers(trailersWithVideos);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching trailers:', err);
            }
        };

        fetchUpcomingMoviesAndTrailers();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!trailers[trailerIndex] || !trailers[trailerIndex].trailer) {
        return <div>No trailer available for this movie.</div>;
    }

    const selectedTrailer = trailers[trailerIndex];
 
    return (
        <div className="movie-trailer-card">
            <h2>{`${selectedTrailer.title} Movie Trailer`}</h2>
            <div className="trailer-con">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedTrailer.trailer.key}?enablejsapi=1`} // Ensure `enablejsapi=1` for API control
                title={selectedTrailer.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
        </div>
    );
}

export default MovieCard;
