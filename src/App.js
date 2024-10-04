import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesNow from "./component";
import SearchResult from "./component/SearchResult";
import SignIn from "./component/SignIn";

function App() {
  return (
    <Router basename="/movies-now">
      <Routes>
        <Route path="/" element={<MoviesNow />} />
        {/* Update the search route to handle both query and type */}
        <Route path="/search/:query/:type" element={<SearchResult />} /> 
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
