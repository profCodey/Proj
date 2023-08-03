import { useState, useEffect } from "react";

export function useMovies(query, handleCloseMovie) {
  let KEY = "bfdb5d2";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Could not fetch data from movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error(`  movie not found`);
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError")
          console.log("error fetching movies", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie?.();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, handleCloseMovie, KEY]);

  return { movies, isLoading, error };
}