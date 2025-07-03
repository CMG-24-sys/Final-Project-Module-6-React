import React, { useState } from 'react';
import shape1 from '../../Assets/semi circle.svg';
import shape2 from '../../Assets/circle.svg';
import shape3 from '../../Assets/squiggly.svg';
import shape4 from '../../Assets/triangle.svg';



const API_URL = "https://www.omdbapi.com/?apikey=YOUR_API_KEY&s="; // Replace YOUR_API_KEY with a valid OMDB API key

const Landing = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);
    if (!query.trim()) return;
    try {
      const response = await fetch(`${API_URL}${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.Response === "True") {
        setResults(data.Search);
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("An error occurred while fetching results.");
    }
  };

  return (
    <>
      <section id="landing">
        <nav>
          <div className="row">
            <div className="nav__container">
              <div className="logo__wrapper">
                <a href="#">
                  <img
                    className="logo"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHm1uM6oRz_FSoFbE6hPfTUN2J_DJbQnk3A&s"
                    alt=""
                  />
                  <h1 className="logo__text">Picture Perfect Films</h1>
                </a>
              </div>
              <ul className="nav__links">
                <li>
                  <a href="#" className="nav__link link__hover-effect">Home</a>
                </li>
                <li>
                  <a href="#" className="nav__link link__hover-effect">Contact</a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav__link nav__link--margin link__hover-effect"
                  >Login</a>
                </li>
                <li>
                  <a href="#" className="nav__link nav__link--primary">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="header__container">
          <div className="header__description">
            <h1 className="header__description--title">
              <span className="orange">Endless films</span> to choose from.
            </h1>
            <p className="header__description--para">
              Our website has a variety of movies for you to choose from.
            </p>
            {/* <form onSubmit={handleSearch}>
              <input
                type="text"
                id="movieSearchInput"
                placeholder="Movie Title"
                value={query}
                onChange={handleInputChange}
              />
              <div className="header__btn--wrapper">
                <button type="submit" className="btn header__btn">
                  Movie Search
                </button>
              </div>
            </form> */}
          </div>
        </header>

        {/* //Background shapes// */}
        <img src={shape1} className="shape shape--0" />
        <img src={shape2} className="shape shape--1" />
        <img src={shape3} className="shape shape--2" />
        <img src={shape4} className="shape shape--3" />

        <section id="search-results">
          <div className="fast__search--results">
            {error && <p>{error}</p>}
            {results.length > 0 && results.map((movie) => (
              <div className="fast__search--result" key={movie.imdbID}>
                <figure className="fast__search--img--wrapper">
                  <img
                    className="fast__search--img"
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x220?text=No+Image"}
                    alt={movie.Title}
                  />
                </figure>
                <div className="fast__search--title">{movie.Title}</div>
                <div className="fast__search--year">{movie.Year}</div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section id="features">
        <div className="container">
          <div className="row features__wrapper">
            <div className="features__description">
              <h5 className="section__title">
                <span className="orange">FEAUTURE FILMS THIS WEEK</span>
              </h5>
              <h1 className="section__heading features__heading">
                Find the latest feature films <span className="orange">HERE!</span>
              </h1>
              <p className="section__para">
                Explore the newest films, along with timeless classics in
                every popular genre.
              </p>
              <button className="btn features__btn">Movie Trailers</button>
            </div>
            <figure className="features__img--wrapper">
              <img
                src="https://www.moviepostersgallery.com/wp-content/uploads/2024/01/Furiosa1.jpg"
                alt=""
                className="features__img"
              />
            </figure>
            <figure>
              <img
                src="https://cdn.shopify.com/s/files/1/0057/3728/3618/files/mad-max-fury-road_e4sycaf2_500x749.jpg?v=1706563087"
                alt=""
                className="features__img-2"
              />
            </figure>
            <figure>
              <img
                src="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ItemN241475_jpg_500x749.jpg?v=1641576614"
                alt=""
                className="features__img-3"
              />
            </figure>
            <figure>
              <img
                src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSPSyrcqWohb0QLO_b8yiwdrAYfdC-3bG51IYqhzOEjBhtJkPl3ktU5oMUyB6rsidHqJ7TUs9dE11ZBkTFEyMeyG-j1-2__y19fuZ7eg-B-dJ0khhgrmy1y&usqp=CAc"
                alt=""
                className="features__img-4"
              />
            </figure>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer__copyright">
          <span className="white">
            <figure>
              <img
                className="footer__logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHm1uM6oRz_FSoFbE6hPfTUN2J_DJbQnk3A&s"
                alt=""
              />
            </figure>
            <i className="fa-regular fa-copyright"></i> 2024 Picture Perfect Films
            Inc. All Rights Reserved. <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-square-twitter"></i>
            <i className="fa-brands fa-square-youtube"></i>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Landing;