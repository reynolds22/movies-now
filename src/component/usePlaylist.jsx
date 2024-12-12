import { useState, useEffect } from "react";

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  useEffect(() => {
    console.log("Updated Playlists:", playlists); // Log playlists after every update
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = (name, description) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      description,
      image: null,
      movies: [],
      shows: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addShowToPlaylist = (playlistId, show) => {
    console.log("Adding show to playlist:", show); // Debugging incoming data
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const isDuplicate = playlist.shows.some((s) => s.id === show.id);
          if (isDuplicate) return playlist;

          const standardizedShow = {
            id: show.id,
            type: "tv",
            title: show.title || "Untitled Show",
            poster_path: show.poster_path || null,
            release_date: show.release_date || "N/A",
            vote_average: show.vote_average || 0,
            original_language: show.original_language || "N/A",
            genre_ids: show.genre_ids || [],
            overview: show.overview || "",
            backdrop_path: show.backdrop_path || null,
          };

          return {
            ...playlist,
            shows: [...playlist.shows, standardizedShow],
            image:
              playlist.image ||
              (show.poster_path &&
                `https://image.tmdb.org/t/p/w500${show.poster_path}`),
          };
        }
        return playlist;
      })
    );
  };

  const addMovieToPlaylist = (playlistId, movie) => {
    console.log("Adding movie to playlist:", movie); // Debugging incoming data
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const isDuplicate = playlist.movies.some((m) => m.id === movie.id);
          if (isDuplicate) return playlist;

          const standardizedMovie = {
            id: movie.id,
            type: "movie",
            title: movie.title || "Untitled Movie",
            poster_path: movie.poster_path || null,
            release_date: movie.release_date || "N/A",
            vote_average: movie.vote_average || 0,
            original_language: movie.original_language || "N/A",
            genre_ids: movie.genre_ids || [],
            overview: movie.overview || "",
            backdrop_path: movie.backdrop_path || null,
          };

          return {
            ...playlist,
            movies: [...playlist.movies, standardizedMovie],
            image:
              playlist.image ||
              (movie.poster_path &&
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`),
          };
        }
        return playlist;
      })
    );
  };

  return {
    playlists,
    setPlaylists,
    addPlaylist,
    addMovieToPlaylist,
    addShowToPlaylist,
  };
}
