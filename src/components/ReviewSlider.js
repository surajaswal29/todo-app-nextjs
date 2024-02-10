import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import reviewsData from './reviewsData'; // Assume this is your data file with reviews

function ReviewSlider() {
  const [reviews, setReviews] = useState(reviewsData);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, reviews]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-gray-500">We provide professional reviews about private and professional projects that influence our clients to make informed decisions.</p>
        </div>
        <div className="flex justify-center items-center relative">
          {reviews.map((review, reviewIndex) => {
            const { id, image, name, position, testimonial } = review;

            let positionClass = 'nextSlide opacity-0 transform translate-x-full transition-all duration-500 ease-in-out';
            if (reviewIndex === index) {
              positionClass = 'activeSlide opacity-100 scale-100 transition-all duration-500 ease-in-out';
            }
            if (
              reviewIndex === index - 1 ||
              (index === 0 && reviewIndex === reviews.length - 1)
            ) {
              positionClass = 'lastSlide opacity-50 transform -translate-x-full';
            }

            return (
              <article className={`${positionClass} absolute inset-0 flex flex-col items-center`} key={id}>
                {/* <img src={image} alt={name} className="w-24 h-24 rounded-full shadow-lg mb-4" /> */}
                <h4 className="text-lg font-semibold">{name}</h4>
                <p className="text-sm text-blue-500 mb-2">{position}</p>
                <p className="text-gray-700 px-6 text-center">{testimonial}</p>
                <FaQuoteRight className="text-blue-500 mt-2" />
              </article>
            );
          })}
          <button className="prev absolute left-0 transform -translate-y-1/2 top-1/2" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft className="text-gray-800 text-2xl hover:text-blue-500" />
          </button>
          <button className="next absolute right-0 transform -translate-y-1/2 top-1/2" onClick={() => setIndex(index + 1)}>
            <FiChevronRight className="text-gray-800 text-2xl hover:text-blue-500" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewSlider;
