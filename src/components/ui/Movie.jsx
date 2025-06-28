import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { Price } from './Price';


const Movie = ({ movie }) => {
    const [img, setImg] = useState(null);

    const mountedRef = useRef(true); 

    useEffect(() => {
        const image = new Image();
        image.src = movie.url;
        const fallbackUrl = "https://via.placeholder.com/150?text=No+Image";
        const handleLoad = () => {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                setImg(image);
            }, 300);
        };
        const handleError = () => {
            image.src = fallbackUrl;
        };
        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);
        // Cleanup listeners on unmount
        return () => {
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
        };
    }, [movie.url]);
        

    return (
        <div className="movie">
            {img ? (
                <>
                    <Link to={`/movies/${movie.id}`}>
                        <figure className="movie__img--wrapper">
                            <img src={img.src} alt="" className="movie_img" />
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