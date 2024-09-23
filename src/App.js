import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesNow from "./component";
import SearchResult from "./component/SearchResult";

function App() {
  return (
    <Router basename="/movies-now">
      <Routes>
        <Route path="/" element={<MoviesNow />} />
        <Route path="/search/:query" element={<SearchResult />} /> 
      </Routes>
    </Router>
  );
}

export default App;
