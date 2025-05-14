'use client';
   import Link from "next/link";
   import { useState, useEffect } from "react";
   import "slick-carousel/slick/slick.css";
   import "slick-carousel/slick/slick-theme.css";
   import Carousel from "../components/Carousel";
   import { supabase } from "../lib/supabase";
   import { useRouter } from "next/navigation";

   export default function Homepage() {
     const [isOpen, setIsOpen] = useState(false);
     const [movies, setMovies] = useState([]);
     const [kDramas, setKDramas] = useState([]);
     const [series, setSeries] = useState([]);
     const [featuredMovie, setFeaturedMovie] = useState(null);
     const [loading, setLoading] = useState(true);
     const router = useRouter();

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

           // Fetch popular movies
           const movieResponse = await fetch(
             `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
           );
           if (!movieResponse.ok) throw new Error("Movie fetch failed");
           const movieData = await movieResponse.json();
           setMovies(movieData.results);
           setFeaturedMovie(movieData.results[Math.floor(Math.random() * movieData.results.length)]);

           // Fetch K-Dramas
           const kDramaResponse = await fetch(
             `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&with_genres=18&sort_by=popularity.desc&page=1`
           );
           if (!kDramaResponse.ok) throw new Error(`K-Drama fetch failed: ${kDramaResponse.status}`);
           const kDramaData = await kDramaResponse.json();
           setKDramas(kDramaData.results);

           // Fetch trending series
           const seriesResponse = await fetch(
             `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`
           );
           if (!seriesResponse.ok) throw new Error("Series fetch failed");
           const seriesData = await seriesResponse.json();
           setSeries(seriesData.results);

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
       <div className="w-full h-fit">
         <div
           className="moviePoster w-full h-80 bg-cover bg-center"
           style={{
             backgroundImage: featuredMovie
               ? `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
               : "url('./wall11.png')"
           }}
         >
           <div className="flex">
             <img src="./N.png" className="absolute w-5 top-30 ml-4" alt="N Icon" />
             <p className="absolute top-30 ml-10 font-bold">Film</p>
             {featuredMovie && (
               <h1 className="absolute w-50 h-40 top-35 ml-4 text-white text-4xl font-bold">
                 {featuredMovie.title}
               </h1>
             )}
             <button className="absolute top-70 left-85 bg-white text-black p-1 px-2 rounded-lg font-bold">
               ▶ Play
             </button>
             <p className="absolute top-70 text-white p-2 font-bold">Only on Netflix</p>
           </div>
           <nav className="flex justify-between items-center p-1">
             <div className="flex flex-col justify-center items-center">
               <img
                 src="../netflix2.svg"
                 className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
                 alt="Netflix Logo"
               />
               <div className="absolute top-6 left-25 text-left">
                 <button
                   onClick={() => setIsOpen(!isOpen)}
                   className="flex px-2 py-2 text-sm font-bold text-white rounded-md hover:bg-blue-700"
                 >
                   Browse
                   <img className="w-6 h-6" src="./ddarrow.png" alt="Dropdown Arrow" />
                 </button>
                 {isOpen && (
                   <div className="absolute right-0 left-1 mt-10 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                     <div className="py-1">
                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Option 1
                       </a>
                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Option 2
                       </a>
                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Option 3
                       </a>
                     </div>
                   </div>
                 )}
               </div>
             </div>
             <div className="flex gap-4 text-white">
               <img className="w-8 h-8" src="./search.png" alt="Search" />
               <img className="w-8 h-8" src="./notifi.png" alt="Notifications" />
               <img className="w-8 h-8" src="./profile.png" alt="Profile" />
             </div>
           </nav>
         </div>
         <div className="carousel-container">
           <h3 className="text-white font-bold pl-2 mt-4">Movies</h3>
           <Carousel items={movies} loading={loading} settings={settings} />
         </div>
         <div className="carousel-container">
           <h3 className="text-white font-bold pl-2 mt-4">K-Dramas</h3>
           <Carousel items={kDramas} loading={loading} settings={settings} />
         </div>
         <div className="carousel-container">
           <h3 className="text-white font-bold pl-2 mt-4">Trending Series</h3>
           <Carousel items={series} loading={loading} settings={settings} />
         </div>
       </div>
     );
   }