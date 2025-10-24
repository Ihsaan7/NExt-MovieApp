'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const WatchPage = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [user, setUser] = useState(null)
  const [similarContent, setSimilarContent] = useState([])
  const [isInMyList, setIsInMyList] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const params = useParams()
  const router = useRouter()
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/SignIn')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/SignIn')
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
        const { id } = params
        
        // Extract content type and ID from the parameter
        // Format: movie-123 or tv-456
        const [type, contentId] = id.split('-')
        
        if (!type || !contentId) {
          throw new Error('Invalid content ID format')
        }

        // Fetch main content details
        const contentResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${contentId}?api_key=${apiKey}&append_to_response=videos,credits,similar`
        )
        
        if (!contentResponse.ok) {
          throw new Error('Failed to fetch content details')
        }
        
        const contentData = await contentResponse.json()
        setContent({ ...contentData, type })

        // Fetch similar content
        if (contentData.similar?.results) {
          setSimilarContent(contentData.similar.results.slice(0, 12))
        }

      } catch (error) {
        console.error('Error fetching content:', error)
        setError('Failed to load content details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchContent()
    }
  }, [params.id])

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (isPlaying) {
      const resetTimeout = () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
        setShowControls(true)
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }

      resetTimeout()
      
      const handleMouseMove = () => resetTimeout()
      document.addEventListener('mousemove', handleMouseMove)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
      }
    }
  }, [isPlaying])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleBack = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setShowControls(true)
    } else {
      router.back()
    }
  }

  const toggleMyList = async () => {
    try {
      const storedList = localStorage.getItem(`mylist_${user?.id || 'guest'}`);
      let listIds = storedList ? JSON.parse(storedList) : [];
      
      const contentItem = {
        id: content.id,
        type: content.type
      };
      
      const isCurrentlyInList = listIds.some(item => item.id === content.id && item.type === content.type);
      
      if (isCurrentlyInList) {
        // Remove from list
        listIds = listIds.filter(item => !(item.id === content.id && item.type === content.type));
        setIsInMyList(false);
      } else {
        // Add to list
        listIds.push(contentItem);
        setIsInMyList(true);
      }
      
      // Update localStorage
      localStorage.setItem(`mylist_${user?.id || 'guest'}`, JSON.stringify(listIds));
    } catch (error) {
      console.error('Error updating my list:', error);
    }
  }

  // Check if item is in list on component mount
  useEffect(() => {
    if (content && user) {
      const storedList = localStorage.getItem(`mylist_${user?.id || 'guest'}`);
      if (storedList) {
        const listIds = JSON.parse(storedList);
        const isInList = listIds.some(item => item.id === content.id && item.type === content.type);
        setIsInMyList(isInList);
      }
    }
  }, [content, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-netflix">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-netflix-bold text-white mb-4">Content Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The requested content could not be found.'}</p>
          <Link href="/Homepage">
            <button className="bg-red-600 text-white px-6 py-3 rounded font-netflix hover:bg-red-700 transition-colors duration-200">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const title = content.title || content.name
  const releaseDate = content.release_date || content.first_air_date
  const backdropUrl = content.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
    : '/wall11.png'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player / Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          )}
        </div>

        {/* Controls Overlay */}
        <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${
          isPlaying && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          {/* Top Navigation */}
          <nav className="absolute top-0 left-0 right-0 z-30 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-netflix text-lg">{isPlaying ? 'Exit' : 'Back'}</span>
              </button>

              {!isPlaying && (
                <Link href="/Homepage">
                  <Image
                    src="/netflix.svg"
                    alt="Netflix Logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
              )}
            </div>
          </nav>

          {/* Content Info (only when not playing) */}
          {!isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-2xl">
                {/* Netflix Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <span className="text-white font-semibold uppercase tracking-wide text-sm">
                    {content.type === 'movie' ? 'FILM' : 'SERIES'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-netflix-bold text-white mb-4 leading-tight">
                  {title}
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-4 mb-6 text-white/90">
                  {content.vote_average && (
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-netflix">{content.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  {releaseDate && (
                    <span className="font-netflix">{new Date(releaseDate).getFullYear()}</span>
                  )}
                  {content.runtime && (
                    <span className="font-netflix">{Math.floor(content.runtime / 60)}h {content.runtime % 60}m</span>
                  )}
                  {content.number_of_seasons && (
                    <span className="font-netflix">{content.number_of_seasons} Season{content.number_of_seasons > 1 ? 's' : ''}</span>
                  )}
                </div>

                {/* Description */}
                {content.overview && (
                  <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl font-netflix-light">
                    {content.overview.length > 300 
                      ? `${content.overview.substring(0, 300)}...` 
                      : content.overview
                    }
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePlay}
                    className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-md font-netflix-bold text-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                  </button>

                  <button
                    onClick={toggleMyList}
                    className="flex items-center justify-center gap-3 bg-gray-600/70 text-white px-8 py-4 rounded-md font-netflix-bold text-lg hover:bg-gray-600/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    {isInMyList ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                    {isInMyList ? 'Remove from List' : 'Add to List'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fake Video Player Overlay (when playing) */}
        {isPlaying && (
          <div className="absolute inset-0 z-10 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-netflix-bold text-white mb-2">Loading {title}</h2>
              <p className="text-gray-300 font-netflix">
                This is a demo. In a real streaming platform, the video would play here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content Details Section (only when not playing) */}
      {!isPlaying && (
        <div className="relative z-10 bg-black px-6 md:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Cast and Crew */}
            {content.credits?.cast && content.credits.cast.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-netflix-bold text-white mb-6">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {content.credits.cast.slice(0, 12).map((person) => (
                    <div key={person.id} className="text-center">
                      {person.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          width={185}
                          height={278}
                          className="w-full h-auto rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <p className="text-white font-netflix text-sm">{person.name}</p>
                      <p className="text-gray-400 font-netflix text-xs">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Content */}
            {similarContent.length > 0 && (
              <div>
                <h2 className="text-2xl font-netflix-bold text-white mb-6">More Like This</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similarContent.map((item) => (
                    <Link
                      key={item.id}
                      href={`/watch/${content.type}-${item.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        {item.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                            alt={item.title || item.name}
                            width={342}
                            height={513}
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-white font-netflix text-sm mt-2 group-hover:text-gray-300 transition-colors duration-200">
                        {item.title || item.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WatchPage