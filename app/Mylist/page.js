'use client';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MyList() {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
  }, [router]);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        const { data, error } = await supabase
          .from('mylist')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setMyList(data || []);
      } catch (error) {
        console.error('Error fetching my list:', error);
        setError('Failed to load your list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex justify-between items-center p-4 bg-black/80">
        <Link href="/Homepage">
          <Image
            src="/netflix2.svg"
            alt="Netflix Logo"
            width={100}
            height={40}
            className="w-25 h-20"
            priority
          />
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My List</h1>
        
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50/10 rounded-md mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : myList.length === 0 ? (
          <div className="text-white text-center">
            Your list is empty. Add some movies or shows to get started!
            ( Under Development )
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myList.map((item) => (
              <div key={item.id} className="relative group">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  width={300}
                  height={450}
                  className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                  <button
                    onClick={() => {/* Add remove from list functionality */}}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}