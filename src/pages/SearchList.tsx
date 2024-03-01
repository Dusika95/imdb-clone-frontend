import { useQuery, useMutation } from "react-query";
import { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export interface SearchList{
  totalNames?: number;
  totalMovies?: number;
  namePageIndex?: number;
  moviePageIndex?: number;
  names?: Name[];
  movies?: Movie[];
}
interface Name {
  id: number;
  fullName: string;
}
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
}

interface ListError {
  message: string;
}

//`/search?searchText=vak&searchType=${searchtypeWithtypo}`
// export default function SearchList({
//   }
// ) {
//   const {
//     isLoading,
//     data: searchList,
//     error,
//     refetch,
//     isFetching,
//   } = useQuery<SearchListDto, ListError>(
//     "list",
//     () =>
//       fetch(
//         `http://localhost:5000/search?searchText=${searchText}&searchType=${searchType}`,
//         {
//           method: "GET",
//         }
//       ).then((res) => res.json()),
//     {
//       enabled: searchText!.trim() !== "",
//       // Csak akkor indítsa el a lekérdezést, ha van szöveg a keresési mezőben
//     }
//   );
//   if (isLoading || isFetching) return <div>Loading...</div>;

//   if (error) return <div>An error has occured: {error.message}</div>;

  return (
    <div>
      <h1>Search: "{searchText}"</h1>
      {["all", "names"].includes(searchType!) && searchList?.names && (
        <div>
          <h1>People</h1>
          {searchList.names.length === 0 ? (
            <h2>No match</h2>
          ) : (
            searchList.names.map((name) => (
              <div className="movie-name-elem" key={name.id}>
                <p>{name.fullName}</p>
              </div>
            ))
          )}
        </div>
      )}

      {["all", "movieTitle"].includes(searchType!) && searchList?.movies && (
        <div>
          <h1>Titles</h1>
          {searchList.movies.length === 0 ? (
            <h2>No match</h2>
          ) : (
            searchList.movies.map((movie) => (
              <div className="movie-name-elem" key={movie.id}>
                <p>{movie.title}</p>
                <p>{movie.releaseDate}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
