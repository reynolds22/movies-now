import React, {useState, useEffect} from "react";
import axios from "axios";

function MoviesNow(){

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchMovie = async() => {
            try {
                const responce = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=808196157aa973f359929571d9321e60&query=Inception`); 
                setMovie(responce.data.results[0]);
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
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
        </div>
    );
};
export default MoviesNow;