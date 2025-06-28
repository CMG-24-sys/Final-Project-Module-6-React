import React from 'react';
import './Price.css';
import './App.css'; // Assuming you have an App.css if needed
import './index.css';


const Price = ({ salePrice, originalPrice }) => {
    return (
        <div className="movie__price">
                    {
                        salePrice ? (
                        <>
                            <span className="movie__price--normal">
                            ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : 'N/A'}
                            </span>
                            ${typeof salePrice === 'number' ? salePrice.toFixed(2) : 'N/A'}
                        </>
                        ) : (
                           <>${originalPrice.toFixed(2)}</>
                        )}
                </div>
    );
};

export default Price; 