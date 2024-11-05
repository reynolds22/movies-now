// usePlaylists.jsx
import { useState, useEffect } from "react";

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = (name, description, image = null) => {
    const newPlaylist = { id: Date.now(), name, description, image, movies: [] };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addMovieToPlaylist = (playlistId, movie) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const updatedPlaylist = {
            ...playlist,
            movies: [...playlist.movies, movie],
          };

          // Debugging logs to see values during execution
          console.log(`Adding movie to playlist: ${playlist.name}`);
          console.log(`Current image: ${playlist.image}`);
          console.log(`Movie poster_path: ${movie.poster_path}`);

          // Set the movie's poster as the cover image if no cover image exists
          if (!playlist.image && movie.poster_path) {
            updatedPlaylist.image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            console.log(`New cover image set: ${updatedPlaylist.image}`);
          } else {
            console.log("Cover image already exists or movie poster path is missing.");
          }

          return updatedPlaylist;
        }
        return playlist;
      })
    );
  };

  return { playlists, addPlaylist, addMovieToPlaylist };
}
