import { useState, useEffect } from "react";

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    try {
      return savedPlaylists ? JSON.parse(savedPlaylists) : [];
    } catch (error) {
      console.error("Error parsing playlists from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
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
  
    setPlaylists((prev) => {
      const updatedPlaylists = [...prev, newPlaylist];
      return updatedPlaylists;
    });
    };
      
  const addMovieToPlaylist = (playlistId, movie) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              movies: [...playlist.movies, movie],
              image: playlist.image || `https://image.tmdb.org/t/p/original${movie.poster_path || "default.jpg"}`,
            }
          : playlist
      )
    );
  };

  const addShowToPlaylist = (playlistId, show) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              shows: [...playlist.shows, show],
              image: playlist.image || show.image,
            }
          : playlist
      )
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
