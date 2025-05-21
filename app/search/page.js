'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (q) {
      fetch(`/api/search?query=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch(() => setResults([]));
    }
  }, [q]);

  return (
    <div className="text-white p-4">
      <h1>Search Results for "{q}"</h1>
      {results.length ? (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              {item.title} ({item.type})
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}