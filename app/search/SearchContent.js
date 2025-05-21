import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}