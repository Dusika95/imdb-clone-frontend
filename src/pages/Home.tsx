<<<<<<< HEAD
import { useQuery, useMutation } from "react-query";
import { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
=======
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export interface MoviesListDto {
  total: number;
  pageIndex: number;
  movieList: Movie[];
}
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30

interface Movie {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
}

interface MovieError {
  message: string;
}

export default function Home() {
<<<<<<< HEAD
=======
  const [pageIndex, setPageIndex] = useState<number>(0);

>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  const {
    isLoading,
    data: movies,
    error,
    refetch,
    isFetching,
<<<<<<< HEAD
  } = useQuery<Movie[], MovieError>("movies", () =>
    fetch("http://localhost:5000/movies", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => res.json())
  );
=======
  } = useQuery<MoviesListDto, MovieError>(
    ["movies", pageIndex],
    ({ queryKey }) =>
      fetch(`http://localhost:5000/movies?pageIndex=${queryKey[1]}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => res.json())
  );

>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;

<<<<<<< HEAD
  return (
    <div className="flex flex-wrap justify-center items-center mt-3">
      {movies?.length === 0 ? (
        <h1>No data in database</h1>
      ) : (
        movies?.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <div
              className="bg-white border-2 rounded border-yellow-300 mr-1 px-1 py-0.5 min-h-32 max-w-28"
              key={movie.id}
            >
              <p className="">{movie.title}</p>
              <p>Rating: {movie.rating}</p>
              <p>{dayjs(movie.releaseDate).format("YYYY")}</p>
            </div>
          </Link>
        ))
      )}
=======
  const arrayOfPages = [];
  let counting = movies!.total;

  if (movies!.total / 30 > 0) {
    let pageSerialNumber = 0;
    while (counting > 0) {
      arrayOfPages.push(pageSerialNumber);
      pageSerialNumber++;
      counting -= 30;
    }
  }

  const handlePaging = async (value: number) => {
    setPageIndex(value);
    await refetch();
  };

  return (
    <div className="flex items-center flex-col">
      <div className="flex w-9/12">
        <div className="flex flex-wrap justify-center w-full">
          {movies?.total === 0 ? (
            <h1>No data in database</h1>
          ) : (
            movies?.movieList.map((movie) => (
              <Link
                key={movie.id}
                className="bg-white border-2 rounded border-amber-400 mr-2 px-2 py-2 w-1/6 mt-3 h-36"
                to={`/movies/${movie.id}`}
              >
                <div>
                  <p className="">{movie.title}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>{dayjs(movie.releaseDate).format("YYYY")}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className={`text-white mt-3 flex`}>
        {arrayOfPages.map((page) => (
          <p
            className={`${
              page === pageIndex && "font-bold"
            } hover:underline cursor-pointer p-2`}
            onClick={() => handlePaging(page)}
            key={page}
          >
            {page + 1}
          </p>
        ))}
      </div>
      <Outlet />
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    </div>
  );
}
