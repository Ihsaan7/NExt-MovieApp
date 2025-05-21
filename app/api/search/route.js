export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  if (!query) return new Response(JSON.stringify([]), { status: 400 });

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=0d6bdb0fd2d104848743ab1519f84696&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('TMDB API error');
    const data = await res.json();
    const results = data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      type: item.media_type,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
    }));

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}