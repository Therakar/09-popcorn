import { useEffect, useState } from "react";

const KEY = "927548be";

//CUSTOM HOOK

// I can also default export here if I want
export function useMovies(query) {
  //state I need for this custom hook
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.(); // handleCloseMovie();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("movie not found");

          setMovies(data.Search);
          setError("");
          // console.log(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query] //I should add also the callback here but this generate like infinite errors and I don't know how to fix it yet
  );

  return {
    movies,
    isLoading,
    error,
  }; /* Here I'm returning these pieces of information 
  that I'm going to need outside this custom hook*/
}
