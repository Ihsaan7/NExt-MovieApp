'use client';
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../components/Carousel";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [movies, setMovies] = useState([]);
  const [kDramas, setKDramas] = useState([]);
  const [series, setSeries] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setSearchResults(data);
      setIsSearchOpen(false);
      setSearchQuery('');
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
    }
  }, [searchQuery]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const [movieResponse, kDramaResponse, seriesResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&with_genres=18&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`)
      ]);

      if (!movieResponse.ok) throw new Error('Failed to fetch movies');
      if (!kDramaResponse.ok) throw new Error('Failed to fetch K-Dramas');
      if (!seriesResponse.ok) throw new Error('Failed to fetch series');

      const [movieData, kDramaData, seriesData] = await Promise.all([
        movieResponse.json(),
        kDramaResponse.json(),
        seriesResponse.json()
      ]);

      if (movieData.results?.length) {
        setMovies(movieData.results);
        const validMovies = movieData.results.filter(movie => movie.backdrop_path);
        setFeaturedMovie(validMovies[Math.floor(Math.random() * validMovies.length)] || movieData.results[0]);
      }

      setKDramas(kDramaData.results);
      setSeries(seriesData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) router.push("/SignIn");
      } catch (error) {
        console.error('Auth error:', error);
        router.push("/SignIn");
      }
    };
    checkUser();
    fetchData();
  }, [router, fetchData]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <div className="slick-arrow slick-next" aria-label="Next slide">→</div>,
    prevArrow: <div className="slick-arrow slick-prev" aria-label="Previous slide">←</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div className="w-full h-fit mb-25">
      <div
        className="moviePoster w-full h-80 bg-cover bg-center lg:h-100 relative"
        style={{
          backgroundImage: featuredMovie?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
            : "url(/wall11.png)"
        }}
      >
        <div className="flex relative z-10">
          <Image 
            src="/N.png" 
            alt="Netflix N Icon" 
            width={40}
            height={40}
            className="absolute w-5 top-30 ml-4 lg:w-10 lg:top-45"
            priority
          />
          <p className="absolute top-30 ml-10 font-bold lg:ml-15 lg:text-xl lg:top-47">Movie</p>
          {featuredMovie && (
            <h1 className="absolute w-60 h-40 top-35 ml-4 text-white text-4xl font-bold md:w-70 lg:top-55 lg:text-5xl lg:w-100 lg:ml-10">
              {featuredMovie.title}
            </h1>
          )}
          <button 
            className="absolute top-70 left-85 bg-white text-black p-1 px-2 rounded-lg font-bold md:left-170 md:hover:bg-gray-100 lg:px-4 lg:p-2 lg:text-xl lg:top-85 lg:left-280 transition-colors duration-200"
            aria-label="Play movie"
          >
            ▶ Play
          </button>
          <p className="absolute top-70 text-white p-2 font-bold md:pl-5 md:text-lg lg:text-xl lg:top-85">Only on Netflix</p>
        </div>

        <nav className="flex justify-between items-center p-1 relative z-20">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/netflix2.svg"
              alt="Netflix Logo"
              width={100}
              height={40}
              className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
              priority
            />
            <div className="absolute top-6 left-25 text-left md:top-10 md:left-60">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex px-2 py-2 text-sm font-bold text-white rounded-md md:hover:bg-gray-800 md:text-xl transition-colors duration-200"
                aria-expanded={isOpen}
                aria-controls="browse-menu"
              >
                Browse
                <Image 
                  src="/ddarrow.png" 
                  alt="Dropdown Arrow" 
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
              {isOpen && (
                <div 
                  id="browse-menu"
                  className="absolute right-0 left-1 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5"
                  role="menu"
                >
                  <div className="py-1">
                    <Link 
                      href="/Homepage" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Movies
                    </Link>
                    <Link 
                      href="/TvShow" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Tv-Series
                    </Link>
                    <Link 
                      href="/Mylist" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      My List
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 text-white items-center relative">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <Image
                  src="/search.png"
                  alt="Search"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </button>
              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-12 right-0 w-64 bg-black text-white border border-gray-700 shadow-2xl rounded-md overflow-hidden"
                  role="search"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search here.."
                    className="w-full px-4 py-2 text-sm text-white bg-black focus:outline-none focus:ring-1 focus:ring-gray-600"
                    autoFocus
                    aria-label="Search movies and TV shows"
                  />
                </form>
              )}
            </div>

            <button 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
              aria-label="Notifications"
            >
              <Image 
                src="/notifi.png" 
                alt="Notifications" 
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsOpenP(!isOpenP)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
                aria-expanded={isOpenP}
                aria-controls="profile-menu"
              >
                <Image 
                  src="/profile.png" 
                  alt="Profile" 
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </button>
              {isOpenP && (
                <div 
                  id="profile-menu"
                  className="absolute right-0 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5 rounded-md"
                  role="menu"
                >
                  <div className="py-1">
                    <Link 
                      href="/Account" 
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Manage Account
                    </Link>
                    <Link 
                      href="/SignIn" 
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Sign Out
                    </Link>
                    <Link 
                      href="#" 
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {error && (
        <div 
          className="text-red-500 text-center p-4 bg-red-50/10 rounded-md mx-4 my-2"
          role="alert"
        >
          {error}
        </div>
      )}

      {searchResults.length > 0 ? (
        <div className="carousel-container">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-white font-bold mt-4 lg:text-xl">Search Results</h3>
            <button
              onClick={() => setSearchResults([])}
              className="text-white text-sm lg:text-xl hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            >
              Clear
            </button>
          </div>
          <Carousel items={searchResults} loading={false} settings={settings} />
        </div>
      ) : (
        <>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-4 mt-4 lg:text-xl">Movies</h3>
            <Carousel items={movies} loading={loading} settings={settings} />
          </div>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-4 mt-4 lg:text-xl">K-Dramas</h3>
            <Carousel items={kDramas} loading={loading} settings={settings} />
          </div>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-4 mt-4 lg:text-xl">Trending Series</h3>
            <Carousel items={series} loading={loading} settings={settings} />
          </div>
        </>
      )}
    </div>
  );
}