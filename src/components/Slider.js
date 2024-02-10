import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function Slider() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section bg-gray-100 py-8">
      <div className="title text-center mb-4">
        <h2 className="text-3xl font-bold inline-block mr-2">
          <span className="text-blue-500">/</span>reviews
        </h2>
      </div>
      <div className="section-center mx-auto flex justify-center items-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide opacity-0 transition-all duration-500 ease-in-out';
          if (personIndex === index) {
            position = 'activeSlide opacity-100 scale-100';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide opacity-50';
          }

          return (
            <article className={`${position} flex flex-col items-center`} key={id}>
              <img src={image} alt={name} className="person-img w-24 h-24 rounded-full mb-4" />
              <h4 className="text-xl font-semibold">{name}</h4>
              <p className="title text-sm text-gray-500 mb-2">{title}</p>
              <p className="text text-gray-700 text-center px-3">{quote}</p>
              <FaQuoteRight className="icon mt-2 text-blue-500" />
            </article>
          );
        })}
        <button className="prev mr-4" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft className="text-blue-500 text-2xl" />
        </button>
        <button className="next ml-4" onClick={() => setIndex(index + 1)}>
          <FiChevronRight className="text-blue-500 text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default Slider;
