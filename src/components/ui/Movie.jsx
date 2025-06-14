import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Price from './Price';

const Movie = ({ movie }) => {
    const [img, setImg] = useState(null);

    const mountedRef = useRef(true); 

    useEffect(() => {
        const image = new Image();
        image.src = movie.url;
        const handleLoad = () => {
        // Small delay to ensure smooth transition
        setTimeout(() => {
        setImg(image);
        }, 300);
        };
        image.addEventListener('load', handleLoad);
        // Cleanup listener on unmount
        return () => {
        image.removeEventListener('load', handleLoad);
        };
        }, [movie.url]);
        

    return (
        <div className="movie">
            {img ? (
                <>
                    <Link to={`/movies/${movie.id}`}>
                        <figure className="movie__img--wrapper">
                            <img src={img.src} alt="" className="movie__img" />
                        </figure>
                    </Link>
                    <div className="movie__title">
                        <Link to={`/movies/${movie.id}`} className="movie__title--link">
                            {movie.title}
                        </Link>
                    </div>
                    <Rating rating={movie.rating} />
                    <Price salePrice={movie.salePrice} originalPrice={movie.originalPrice} />
                </>
            ) : (
                <>
                    <div className="movie__img--skeleton"></div>
                    <div className="skeleton movie__title--skeleton"></div>
                    <div className="skeleton movie__rating--skeleton"></div>
                    <div className="skeleton movie__price--skeleton"></div>
                </>
            )}
        </div>
    );
};

export default Movie;