// // app/search/SearchContent.jsx
// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function SearchContent() {
//   const searchParams = useSearchParams();
//   const q = searchParams.get('q');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (q) {
//       fetch(`/api/search?query=${encodeURIComponent(q)}`)
//         .then((res) => res.json())
//         .then((data) => setResults(data))
//         .catch(() => setResults([]));
//     }
//   }, [q]);

//   return (
//     <div className="text-white p-4">
//       <h1>Search Results for "{q}"</h1>
//       {results.length ? (
//         <ul>
//           {results.map((item) => (
//             <li key={item.id}>
//               {item.title} ({item.type})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// }

'use client'; // Ensure this is a client component
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchPage() {
  const searchParams = useSearchParams();
  // Your component logic
  return <div>Your search page content</div>;
}

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}