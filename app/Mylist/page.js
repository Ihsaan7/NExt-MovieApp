'use client';
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MyList() {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Refs for click outside detection
  const browseMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const searchRef = useRef(null);

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
  }, [router]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (browseMenuRef.current && !browseMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsOpenP(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, we'll use localStorage to store the user's list
        // In a real app, this would be stored in a database
        const storedList = localStorage.getItem(`mylist_${user?.id || 'guest'}`);
        
        if (storedList) {
          const listIds = JSON.parse(storedList);
          
          if (listIds.length > 0) {
            // Fetch details for each item in the list from TMDB
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
            const listItems = [];
            
            for (const item of listIds) {
              try {
                const response = await fetch(
                  `https://api.themoviedb.org/3/${item.type}/${item.id}?api_key=${apiKey}`
                );
                if (response.ok) {
                  const data = await response.json();
                  listItems.push({ ...data, type: item.type });
                }
              } catch (err) {
                console.error('Error fetching item:', err);
              }
            }
            
            setMyList(listItems);
          } else {
            setMyList([]);
          }
        } else {
          setMyList([]);
        }
      } catch (error) {
        console.error('Error fetching my list:', error);
        setError('Failed to load your list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyList();
    }
  }, [user]);

  const removeFromList = (itemId, itemType) => {
    try {
      const storedList = localStorage.getItem(`mylist_${user?.id || 'guest'}`);
      let listIds = storedList ? JSON.parse(storedList) : [];
      
      // Remove the item from the list
      listIds = listIds.filter(item => !(item.id === itemId && item.type === itemType));
      
      // Update localStorage
      localStorage.setItem(`mylist_${user?.id || 'guest'}`, JSON.stringify(listIds));
      
      // Update state
      setMyList(prevList => prevList.filter(item => !(item.id === itemId && item.type === itemType)));
    } catch (error) {
      console.error('Error removing from list:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Redirect to homepage with search query
    router.push(`/Homepage?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-black">
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
            <Link href="/TvShow" className="text-white hover:text-gray-300 transition-colors duration-200 font-netflix text-sm">
              TV Shows
            </Link>
            <Link href="/Mylist" className="text-white hover:text-gray-300 transition-colors duration-200 font-netflix text-sm border-b-2 border-white">
              My List
            </Link>
          </div>

          {/* Mobile Browse Menu */}
          <div className="md:hidden relative" ref={browseMenuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors duration-200"
              aria-expanded={isOpen}
            >
              Browse
              <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-sm text-white rounded-md shadow-2xl border border-gray-700 z-50">
                <div className="py-2">
                  <Link href="/Homepage" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <Link href="/TvShow" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                    TV Shows
                  </Link>
                  <Link href="/Mylist" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200" onClick={() => setIsOpen(false)}>
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
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-2xl overflow-hidden z-50"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies and TV shows..."
                  className="w-full px-4 py-3 text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
              </form>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200" aria-label="Notifications">
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
              <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm text-white rounded-md shadow-2xl border border-gray-700 z-50">
                <div className="py-2">
                  <Link href="/Account" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200" onClick={() => setIsOpenP(false)}>
                    Manage Account
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/SignIn");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                  <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200" onClick={() => setIsOpenP(false)}>
                    Help Center
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-netflix-bold text-white mb-8">My List</h1>
        
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-center mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white font-netflix">Loading your list...</p>
            </div>
          </div>
        ) : myList.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-2xl font-netflix-bold text-white mb-4">Your list is empty</h2>
              <p className="text-gray-400 font-netflix mb-8">
                Add movies and TV shows to your list by clicking the "+" button when browsing content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/Homepage">
                  <button className="bg-red-600 text-white px-6 py-3 rounded font-netflix hover:bg-red-700 transition-colors duration-200">
                    Browse Movies
                  </button>
                </Link>
                <Link href="/TvShow">
                  <button className="bg-gray-600 text-white px-6 py-3 rounded font-netflix hover:bg-gray-700 transition-colors duration-200">
                    Browse TV Shows
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((item) => {
              const contentType = item.type || (item.title ? 'movie' : 'tv');
              const watchUrl = `/watch/${contentType}-${item.id}`;
              
              return (
                <div key={`${contentType}-${item.id}`} className="relative group">
                  <Link href={watchUrl}>
                    <div className="relative overflow-hidden rounded-lg cursor-pointer">
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                          width={300}
                          height={450}
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromList(item.id, contentType);
                    }}
                    className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                    aria-label="Remove from list"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Title */}
                  <h3 className="text-white font-netflix text-sm mt-2 group-hover:text-gray-300 transition-colors duration-200">
                    {item.title || item.name}
                  </h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}