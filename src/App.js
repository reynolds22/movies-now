import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesNow from "./component";
import SearchResult from "./component/SearchResult";
import About from "./component/about";
import Layout from "./component/layout";

function App() {
  return (
    <Router basename="/movies-now">
      <Layout/>
        <Routes>
          <Route path="/" element={<MoviesNow />} />
          <Route path="/search/:query/:type" element={<SearchResult />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      <Layout/>
    </Router>
  );
}

export default App;
