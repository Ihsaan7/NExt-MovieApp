'use client';
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../components/Carousel";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TVShows() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [popularSeries, setPopularSeries] = useState([]);
  const [kDramas, setKDramas] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [comedySeries, setComedySeries] = useState([]);
  const [dramaSeries, setDramaSeries] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Refs for click outside detection
  const browseMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const searchRef = useRef(null);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setSearchResults(data.results || []);
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

      const [popularResponse, kDramaResponse, trendingResponse, comedyResponse, dramaResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&with_genres=18&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=35&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=18&sort_by=popularity.desc&page=1`)
      ]);

      if (!popularResponse.ok) throw new Error('Failed to fetch popular series');
      if (!kDramaResponse.ok) throw new Error('Failed to fetch K-Dramas');
      if (!trendingResponse.ok) throw new Error('Failed to fetch trending series');
      if (!comedyResponse.ok) throw new Error('Failed to fetch comedy series');
      if (!dramaResponse.ok) throw new Error('Failed to fetch drama series');

      const [popularData, kDramaData, trendingData, comedyData, dramaData] = await Promise.all([
        popularResponse.json(),
        kDramaResponse.json(),
        trendingResponse.json(),
        comedyResponse.json(),
        dramaResponse.json()
      ]);

      if (popularData.results?.length) {
        setPopularSeries(popularData.results);
        const validSeries = popularData.results.filter(series => series.backdrop_path);
        setFeaturedSeries(validSeries[Math.floor(Math.random() * validSeries.length)] || popularData.results[0]);
      }

      setKDramas(kDramaData.results || []);
      setTrendingSeries(trendingData.results || []);
      setComedySeries(comedyData.results || []);
      setDramaSeries(dramaData.results || []);
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
        if (!user) {
          router.push("/SignIn");
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error('Auth error:', error);
        router.push("/SignIn");
      }
    };
    checkUser();
    fetchData();
  }, [router, fetchData]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close browse menu if clicking outside
      if (browseMenuRef.current && !browseMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // Close profile menu if clicking outside
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsOpenP(false);
      }
      // Close search if clicking outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Custom arrow components to fix React DOM warnings
  const NextArrow = ({ onClick }) => (
    <button
      className="slick-arrow slick-next absolute top-1/2 -right-4 z-20 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg hover:scale-110"
      onClick={onClick}
      aria-label="Next slide"
      style={{ display: 'flex !important' }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      className="slick-arrow slick-prev absolute top-1/2 -left-4 z-20 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg hover:scale-110"
      onClick={onClick}
      aria-label="Previous slide"
      style={{ display: 'flex !important' }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {featuredSeries?.backdrop_path ? (
            <>
              {/* Mobile optimized image */}
              <div className="block md:hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${featuredSeries.backdrop_path}`}
                  alt={featuredSeries.name || 'Featured TV show'}
                  fill
                  className="object-cover object-top"
                  priority
                  quality={90}
                  sizes="100vw"
                />
              </div>
              {/* Desktop optimized image */}
              <div className="hidden md:block">
                <Image
                  src={`https://image.tmdb.org/t/p/original${featuredSeries.backdrop_path}`}
                  alt={featuredSeries.name || 'Featured TV show'}
                  fill
                  className="object-cover object-center"
                  priority
                  quality={85}
                  sizes="100vw"
                />
              </div>
            </>
          ) : (
            <Image
              src="/wall11.png"
              alt="Netflix background"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          )}
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-8">
            <Link href="/Homepage">
              <Image
                src="/netflix2.svg"
                alt="Netflix Logo"
                width={148}
                height={40}
                className="h-10 w-auto sm:h-12 sm:w-auto"
                priority
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/Homepage" className="text-white hover:text-gray-300 transition-colors duration-200 font-netflix text-sm">
                Home
              </Link>
              <Link href="/TvShow" className="text-white hover:text-gray-300 transition-colors duration-200 font-netflix text-sm border-b-2 border-white">
                TV Shows
              </Link>
              <Link href="/Mylist" className="text-white hover:text-gray-300 transition-colors duration-200 font-netflix text-sm">
                My List
              </Link>
            </div>

            {/* Mobile Browse Menu */}
            <div className="md:hidden relative" ref={browseMenuRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors duration-200"
                aria-expanded={isOpen}
                aria-controls="browse-menu"
              >
                Browse
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div 
                  id="browse-menu"
                  className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-sm text-white rounded-md shadow-2xl border border-gray-700 z-50"
                  role="menu"
                >
                  <div className="py-2">
                    <Link 
                      href="/Homepage" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      href="/TvShow" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      TV Shows
                    </Link>
                    <Link 
                      href="/Mylist" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      My List
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-2xl overflow-hidden z-50"
                  role="search"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search TV shows..."
                    className="w-full px-4 py-3 text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                    autoFocus
                    aria-label="Search TV shows"
                  />
                </form>
              )}
            </div>

            {/* Notifications */}
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsOpenP(!isOpenP)}
                className="flex items-center gap-2 p-1 hover:bg-white/10 rounded transition-colors duration-200"
                aria-expanded={isOpenP}
                aria-controls="profile-menu"
              >
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-white transition-transform duration-200 ${isOpenP ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpenP && (
                <div 
                  id="profile-menu"
                  className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm text-white rounded-md shadow-2xl border border-gray-700 z-50"
                  role="menu"
                >
                  <div className="py-2">
                    <Link 
                      href="/Account" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsOpenP(false)}
                    >
                      Manage Account
                    </Link>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        router.push("/SignIn");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                    <Link 
                      href="#" 
                      className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsOpenP(false)}
                    >
                      Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-end md:items-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 pb-20 md:pb-0">
          <div className="max-w-2xl">
            {/* Netflix Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">N</span>
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">SERIES</span>
            </div>

            {/* Title */}
            {featuredSeries && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-netflix-bold text-white mb-4 md:mb-6 leading-tight">
                {featuredSeries.name}
              </h1>
            )}

            {/* Description */}
            {featuredSeries?.overview && (
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-2xl font-netflix-light">
                <span className="block sm:hidden">
                  {featuredSeries.overview.length > 120 
                    ? `${featuredSeries.overview.substring(0, 120)}...` 
                    : featuredSeries.overview
                  }
                </span>
                <span className="hidden sm:block">
                  {featuredSeries.overview.length > 200 
                    ? `${featuredSeries.overview.substring(0, 200)}...` 
                    : featuredSeries.overview
                  }
                </span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {featuredSeries && (
                <Link href={`/watch/tv-${featuredSeries.id}`}>
                  <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                  </button>
                </Link>
              )}
              {featuredSeries && (
                <Link href={`/watch/tv-${featuredSeries.id}`}>
                  <button className="flex items-center justify-center gap-2 bg-gray-600/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    More Info
                  </button>
                </Link>
              )}
            </div>

            {/* Only on Netflix Badge */}
            <div className="mt-8">
              <span className="text-white/80 text-sm font-medium">Only on Netflix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-black pb-20">
        {error && (
          <div className="mx-4 sm:mx-6 lg:mx-8 mb-8">
            <div 
              className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-center"
              role="alert"
            >
              {error}
            </div>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="mb-12">
            <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 mb-4">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold">Search Results</h2>
              <button
                onClick={() => setSearchResults([])}
                className="text-white/70 hover:text-white text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded transition-colors duration-200"
              >
                Clear Results
              </button>
            </div>
            <Carousel items={searchResults} loading={false} settings={settings} />
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold px-4 sm:px-6 lg:px-8 mb-6">Popular TV Shows</h2>
              <Carousel items={popularSeries} loading={loading} settings={settings} />
            </div>
            
            <div className="mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold px-4 sm:px-6 lg:px-8 mb-6">K-Dramas</h2>
              <Carousel items={kDramas} loading={loading} settings={settings} />
            </div>
            
            <div className="mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold px-4 sm:px-6 lg:px-8 mb-6">Trending Series</h2>
              <Carousel items={trendingSeries} loading={loading} settings={settings} />
            </div>

            <div className="mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold px-4 sm:px-6 lg:px-8 mb-6">Comedy Series</h2>
              <Carousel items={comedySeries} loading={loading} settings={settings} />
            </div>

            <div className="mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-netflix-bold px-4 sm:px-6 lg:px-8 mb-6">Drama Series</h2>
              <Carousel items={dramaSeries} loading={loading} settings={settings} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}