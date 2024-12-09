import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/layout"; // Ensure this includes Header and SlidingMenu
import usePlaylists from "./component/usePlaylist";

const MoviesNow = React.lazy(() => import("./component"));
const SearchResult = React.lazy(() => import("./component/SearchResult"));
const About = React.lazy(() => import("./component/about"));
const Playlists = React.lazy(() => import("./component/playlists"));
const CreatePlaylist = React.lazy(() => import("./component/CreatePlaylist"));
const PlaylistDetail = React.lazy(() => import("./component/PlaylistDetail"));
const MovieDetails = React.lazy(() => import("./component/MovieDetails"));

function App() {
  const { playlists, setPlaylists, addPlaylist, addMovieToPlaylist } = usePlaylists();

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route
            path="/"
            element={
              <MoviesNow
                playlists={playlists}
                setPlaylists={setPlaylists} // Pass setPlaylists here
                addMovieToPlaylist={addMovieToPlaylist}
              />
            }
          />
            <Route
              path="/search/:query/:type"
              element={
                <SearchResult playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/playlists" element={<Playlists playlists={playlists} />} />
            <Route
              path="/playlists/create"
              element={<CreatePlaylist addPlaylist={addPlaylist} />}
            />
            <Route
              path="/playlists/:id"
              element={
                <PlaylistDetail
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  addMovieToPlaylist={addMovieToPlaylist}
                />
              }
            />
            <Route
              path="/details/:type/:id"
              element={
                <MovieDetails playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} />
              }
            />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
