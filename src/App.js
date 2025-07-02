import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Assuming you have an App.css if needed
import './index.css';
import Landing from './components/ui/Landing';
// MovieDetail component for showing details
import MovieDetail from './components/MovieDetail';

//Use <Link to={/movie/${imdbID}}> in your search results.
//Update your App.js to use routes and add the <Link>: Import necessary components from react-router-dom; Add a Route for the movie detail page; Wrap each movie result in a <Link> to /movie/{imdbID}.//
//Add a route for /movie/:id and a MovieDetail component that uses useParams() to fetch and display movie details.//

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]); // Clear previous results

    try {
      const response = await fetch(
        `https://omdbapi.com/?apikey=74e09e59&s=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data.Search);
      } else {
        setError(data.Error || "No results found");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Landing />
      <header className="App-header">
        <h1>Movie Search</h1>
        <div className="search-bar">
          <input
            type="text"
            id="movieSearchInput" // Keep ID if other JS needs it, but React typically uses refs or state
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { // Optional: allow search on Enter key press
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="fast__search--results">
              {loading && <p>Loading...</p>}
              {error && <p className="error-message">{error}</p>}

              {!loading && !error && Array.isArray(searchResults) && searchResults.length > 0 && (
                <div className="results-grid">
                  {searchResults.map((fast) => {
                    const poster = fast.Poster && fast.Poster !== "N/A" ? fast.Poster : "https://via.placeholder.com/200x300?text=No+Poster";
                    return (
                      <div key={fast.imdbID} className="fast__search--result-wrapper">
                        <Link
                          to={`/movie/${fast.imdbID}`}
                          className="fast__search--result"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <figure className="fast__search--img--wrapper">
                            <img className="fast__search--img" src={poster} alt={fast.Title || "No Title"} />
                          </figure>
                          <div className="fast__search--title">{fast.Title || "No Title"}</div>
                          <div className="fast__search--year">{fast.Year || "Unknown Year"}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && !error && searchResults.length === 0 && searchQuery.trim() && (
                <p>No results found. Try a different search!</p>
              )}
            </main>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}


