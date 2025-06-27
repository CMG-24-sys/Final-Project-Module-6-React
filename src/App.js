import React, { useState } from 'react';
import react from 'react';
import './App.css'; // Assuming you have an App.css if needed

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
      <header className="App-header">
        <h1>Movie Search</h1>
        <div className="search-bar">
          <input
            type="text"
            id="movieSearchInput" // Keep ID if other JS needs it, but React typically uses refs or state
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => { // Optional: allow search on Enter key press
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <main className="fast__search--results">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && searchResults.length > 0 && (
          <div className="results-grid">
            {searchResults.map((fast) => {
              const poster = fast.Poster !== "N/A" ? fast.Poster : "https://via.placeholder.com/200x300?text=No+Poster"; // Fallback image
              return (
                <div className="fast__search--result" key={fast.imdbID}> {/* imdbID is usually unique */}
                  <figure className="fast__search--img--wrapper">
                    <img className="fast__search--img" src={poster} alt={fast.Title} />
                  </figure>
                  <div className="fast__search--title">{fast.Title}</div>
                  <div className="fast__search--year">{fast.Year}</div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && searchResults.length === 0 && searchQuery.trim() && (
            <p>Start typing to search for movies!</p>
        )}
      </main>
    </div>
  );
}


