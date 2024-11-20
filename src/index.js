import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// make playlist viewing page with the add and delete playlist options
// weiw movies within playlists
// view individual movies
// add movie buttons
// make site responsive css 
// finnish up.

// Create Playlist Page:

// Contains only fields for the playlist name, an optional description, and a save button.
// When saved, the playlist is added to a global playlist state.
// Add to Playlist Popup:

// Clicking the "Add Movie/Show" button on a movie card triggers a popup listing all playlists.
// When a playlist is selected, the movie is added to that playlist.
// Persistent Storage:

// Use localStorage to store playlists and movies added to each playlist so they persist even after the site is closed.
// View Individual Playlist Page:

// Clicking a playlist shows a page with the movies added to that playlist.
// If no movies are added yet, it displays "No movies added yet."

reportWebVitals();

