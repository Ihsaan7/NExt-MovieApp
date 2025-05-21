'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../components/Carousel";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function TVShows() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [series, setSeries] = useState([]);
  const [kSeries, setKSeries] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        if (!res.ok) throw new Error('Search API error');
        const data = await res.json();
        console.log("Search results:", data); // Debug
        setSearchResults(data);
        setIsSearchOpen(false);
        setSearchQuery('');
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/SignIn");
    };
    checkUser();

    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

        // Fetch English series
        const seriesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=en&sort_by=popularity.desc&page=1`
        );
        if (!seriesResponse.ok) throw new Error("Series fetch failed");
        const seriesData = await seriesResponse.json();
        setSeries(seriesData.results);
        const validSeries = seriesData.results.filter(item => item.backdrop_path);
        setFeaturedSeries(validSeries[Math.floor(Math.random() * validSeries.length)] || seriesData.results[0]);

        // Fetch K-Series
        const kSeriesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&sort_by=popularity.desc&page=1`
        );
        if (!kSeriesResponse.ok) throw new Error(`K-Series fetch failed: ${kSeriesResponse.status}`);
        const kSeriesData = await kSeriesResponse.json();
        setKSeries(kSeriesData.results);

        // Fetch trending series
        const trendingSeriesResponse = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`
        );
        if (!trendingSeriesResponse.ok) throw new Error("Trending Series fetch failed");
        const trendingSeriesData = await trendingSeriesResponse.json();
        setTrendingSeries(trendingSeriesData.results);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <div className="slick-arrow slick-next">→</div>,
    prevArrow: <div className="slick-arrow slick-prev">←</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div className="w-full h-fit mb-25">
      <div
        className="moviePoster w-full h-80 bg-cover bg-center lg:h-100"
        style={{
          backgroundImage: featuredSeries
            ? `url(https://image.tmdb.org/t/p/original${featuredSeries.backdrop_path})`
            : "url('./wall11.png')"
        }}
      >
        <div className="flex">
          <img src="./N.png" className="absolute w-5 top-30 ml-4 lg:w-10 lg:top-45" alt="N Icon" />
          <p className="absolute top-30 ml-10 font-bold lg:ml-15 lg:text-xl lg:top-47">Series</p>
          {featuredSeries && (
            <h1 className="absolute w-60 h-40 top-35 ml-4 text-white text-4xl font-bold md:w-70 lg:top-55 lg:text-5xl lg:w-100 lg:ml-15">
              {featuredSeries.name}
            </h1>
          )}
          <button className="absolute top-70 left-85 bg-white text-black p-1 px-2 rounded-lg font-bold md:left-170 md:hover:cursor-pointer lg:px-4 lg:p-2 lg:text-xl lg:top-85 lg:left-280">
            ▶ Play
          </button>
          <p className="absolute top-70 text-white p-2 font-bold md:pl-5 md:text-lg lg:text-xl lg:top-90">Only on Netflix</p>
        </div>
        <nav className="flex justify-between items-center p-1">
          <div className="flex flex-col justify-center items-center">
            <img
              src="../netflix2.svg"
              className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
              alt="Netflix Logo"
            />
            <div className="absolute top-6 left-25 text-left md:top-10 md:left-60">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex px-2 py-2 text-sm font-bold text-white rounded-md md:hover:cursor-pointer md:text-xl"
              >
                Browse
                <img className="w-6 h-6" src="./ddarrow.png" alt="Dropdown Arrow" />
              </button>
              {isOpen && (
                <div className="absolute right-0 left-1 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link href="/Homepage" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      Movies
                    </Link>
                    <Link href="/TvShow" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      Tv-Series
                    </Link>
                    <Link href="/my-list" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      My List
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 text-white items-center relative">
            <div className="relative">
              <img
                className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                src="./search.png"
                alt="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-12 left-0 w-32 bg-black text-white border-t-3 border-gray-200 shadow-2xl ring-1 ring-black ring-opacity-5"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search here.."
                    className="w-full px-4 py-2 text-sm text-white bg-black border-b border-gray-200 focus:outline-none"
                    autoFocus
                  />
                </form>
              )}
            </div>
            <img className="w-8 h-8 md:w-10 md:h-10" src="./notifi.png" alt="Notifications" />
            <div className="relative">
              <button
                onClick={() => setIsOpenP(!isOpenP)}
                className="flex text-sm font-bold text-white rounded-md md:hover:cursor-pointer"
              >
                <img className="w-8 h-8 md:w-10 md:h-10" src="./profile.png" alt="Profile" />
              </button>
              {isOpenP && (
                <div className="absolute right-0 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link href="/Account" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Manage Account
                    </Link>
                    <Link href="/SignIn" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Sign Out
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {searchResults.length > 0 ? (
        <div className="carousel-container">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold pl-2 mt-4">Search Results</h3>
            <button
              onClick={() => setSearchResults([])}
              className="text-white pr-2 text-sm"
            >
              Clear
            </button>
          </div>
          <Carousel items={searchResults} loading={false} settings={settings} />
        </div>
      ) : (
        <>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-2 mt-4">Series</h3>
            <Carousel items={series} loading={loading} settings={settings} />
          </div>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-2 mt-4">K-Series</h3>
            <Carousel items={kSeries} loading={loading} settings={settings} />
          </div>
          <div className="carousel-container">
            <h3 className="text-white font-bold pl-2 mt-4">Trending Series</h3>
            <Carousel items={trendingSeries} loading={loading} settings={settings} />
          </div>
        </>
      )}
    </div>
  );
}