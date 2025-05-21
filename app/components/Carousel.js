'use client';
import Slider from "react-slick";

export default function Carousel({ items, loading, settings }) {
  return (
    <div>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="p-2 lg:pl-5 hover:cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-50 h-auto rounded lg:w-70"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}