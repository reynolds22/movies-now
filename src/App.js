import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesNow from "./component";
import SearchResult from "./component/SearchResult";
import About from "./component/about";
import Layout from "./component/layout";
import Playlists from "./component/playlists";
import CreatePlaylist from "./component/CreatePlaylist";
import PlaylistDetail from "./component/PlaylistDetail";
import usePlaylists from "./component/usePlaylist";

function App() { 
  const { playlists, addPlaylist, addMovieToPlaylist } = usePlaylists();

  return ( 
// App.js
<Router>
  <Layout />
  <Routes>
    <Route 
      path="/" 
      element={<MoviesNow playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />} 
    />
    <Route 
      path="/search/:query/:type" 
      element={<SearchResult playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />} 
    /> 
    <Route path="/about" element={<About />} />
    <Route path="/playlists" element={<Playlists playlists={playlists} />} />
    <Route path="/playlists/create" element={<CreatePlaylist addPlaylist={addPlaylist} />} />
    <Route path="/playlists/:id" element={<PlaylistDetail playlists={playlists} />} />
    <Route path="/playlists/:id" element={<PlaylistDetail playlists={playlists} />} />
  </Routes>
  <Layout />
</Router>
  );
}

export default App;
