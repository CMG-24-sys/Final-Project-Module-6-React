// filepath: c:\Users\cryst\OneDrive\Desktop\Final Project Module 6 React\src\components\MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://omdbapi.com/?apikey=74e09e59&i=${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("An error occurred while fetching movie details");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return null;

  return (
    <div className="movie-detail">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster"} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      {/* Add more details as needed */}
    </div>
  );
}