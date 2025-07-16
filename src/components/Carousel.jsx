// Carousel.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ items, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
           <div key={index} className="min-w-full">
           <img
             src={item.img}
             alt={`Slide ${index}`}
             className={`${className} transition-opacity duration-500 ease-in-out`}
           />
         </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-[#0898a0]" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string.isRequired,

};

export default Carousel;
