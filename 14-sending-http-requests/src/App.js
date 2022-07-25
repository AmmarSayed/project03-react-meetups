import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const getMovies = useCallback(async () => {
    // const ULR = `https://swapi.dev/api/films`;
    const ULR = `https://react-http-f0957-default-rtdb.firebaseio.com/movies.json`;

    setIsLoading(true);
    setIsError(null);

    try {
      const res = await fetch(ULR);
      if (!res.ok) {
        throw new Error("Cannot access URL");
      }
      const data = await res.json();
      const transformedData = Object.entries(data).map(([key, val]) => {
        return {
          id: key,
          ...val,
        };
      });

      // const transformedData = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(transformedData);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const addMovieHandler = async (movie) => {
    setIsLoading(true);
    setIsError(null);

    // sending data to firebase
    try {
      const res = await fetch(
        "https://react-http-f0957-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Cannot access URL");
      }

      const data = await res.json();

      // add the movie using the id coming from API
      setMovies((old) => [
        ...old,
        {
          id: data.name,
          ...movie,
        },
      ]);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
    setIsError(null);
  };

  let content = <p>Found no movies!!</p>;

  if (movies.length) {
    content = <MoviesList movies={movies} />;
  }
  if (isError) {
    content = <p>{isError}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
