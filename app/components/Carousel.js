'use client';
import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";

export default function Carousel({ items, loading, settings }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-72 bg-gray-800 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="px-4 py-8">
        <p className="text-gray-400 text-center">No content available</p>
      </div>
    );
  }

  return (
    <div className="relative px-8 py-4 carousel-container">
      <style jsx global>{`
        .carousel-container .slick-list {
          overflow: visible;
        }
        .carousel-container .slick-track {
          display: flex;
          align-items: center;
        }
        .carousel-container .slick-slide {
          padding: 0 8px;
        }
        .carousel-container .slick-arrow {
          z-index: 30 !important;
        }
        .carousel-container .slick-arrow:before {
          display: none;
        }
      `}</style>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}>
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 mx-2">
              {item.poster_path && !imageErrors[item.id] ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name || 'Movie poster'}
                  width={300}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={() => handleImageError(item.id)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-72 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-netflix">{item.title || item.name}</p>
                  </div>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                <div className="p-4 w-full">
                  <h4 className="text-white font-netflix text-sm mb-1 line-clamp-2">
                    {item.title || item.name}
                  </h4>
                  {item.vote_average && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white text-xs font-netflix">{item.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}