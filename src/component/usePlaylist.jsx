import { useState, useEffect } from "react";

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  // Sync playlists state with localStorage
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Add a new playlist
  const addPlaylist = (name, description, image = null) => {
    const newPlaylist = { id: Date.now(), name, description, image, movies: [] };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addShowToPlaylist = (playlistId, show) => {
    setPlaylists((prev) =>
        prev.map((playlist) => {
            if (playlist.id === playlistId) {
                // Avoid adding duplicate shows
                const isDuplicate = playlist.shows?.some((existingShow) => existingShow.id === show.id);
                if (isDuplicate) return playlist;

                const updatedPlaylist = {
                    ...playlist,
                    shows: playlist.shows ? [...playlist.shows, show] : [show],
                };

                // Set the first show's poster as the cover image if no image exists
                if (!playlist.image && show.poster_path) {
                    updatedPlaylist.image = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
                }

                return updatedPlaylist;
            }
            return playlist;
        })
    );
};

  // Add a movie to a playlist
  const addMovieToPlaylist = (playlistId, movie) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          // Check if the movie already exists in the playlist
          if (playlist.movies.some((existingMovie) => existingMovie.id === movie.id)) {
            return playlist; // Return unchanged if the movie already exists
          }

          const updatedPlaylist = {
            ...playlist,
            movies: [...playlist.movies, movie],
          };

          // Set the first movie's poster as the cover image if no image exists
          if (!playlist.image && movie.poster_path) {
            updatedPlaylist.image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          }

          return updatedPlaylist;
        }
        return playlist;
      })
    );
  };

  // Delete a playlist
  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
  };

  // Delete a movie from a playlist
  const deleteMovieFromPlaylist = (playlistId, movieId) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, movies: playlist.movies.filter((movie) => movie.id !== movieId) }
          : playlist
      )
    );
  };

  // Rearrange movies in a playlist
  const rearrangeMoviesInPlaylist = (playlistId, newMoviesOrder) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, movies: newMoviesOrder }
          : playlist
      )
    );
  };

  return {
    playlists,
    setPlaylists,
    addPlaylist,
    addMovieToPlaylist,
    addShowToPlaylist, // Return this function
    deletePlaylist,
    deleteMovieFromPlaylist,
    rearrangeMoviesInPlaylist,
};
}
