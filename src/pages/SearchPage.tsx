import SearchService from "../services/SearchService";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchResponse() {
  const [searchParams] = useSearchParams();
  const searchText = searchParams!.get("searchText") || "";
  const searchType = searchParams!.get("searchType") || "";

  const [namePageCount, setNamePageCount] = useState<number>(0);
  const [titlePageCount, setTitlePageCount] = useState<number>(0);

  const { isLoading, searchList, refetch, error, isFetching } = SearchService({
    searchText: searchText,
    searchType: searchType,
    pageIndexMovie: titlePageCount,
    pageIndexName: namePageCount,
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;

  //setSearchParams(searchParams)// csak h ne pirosozza nekem a dolgokat...

  let totalMovies = searchList!.totalMovies;
  const arrayMoviePage = [];
  if (
    searchList!.totalMovies! / 5 > 0 &&
    ["all", "movieTitle"].includes(searchType!)
  ) {
    let counter = 0;
    while (totalMovies! > 0) {
      arrayMoviePage.push(counter);
      totalMovies! -= 5;
      counter++;
    }
  }

  const handleMoviePage = async (key: number) => {
    setTitlePageCount(key);
    await refetch();
  };

  let totalNames = searchList?.totalNames;
  const arrayNamePage = [];
  if (
    searchList!.totalNames! / 5 > 0 &&
    ["all", "names"].includes(searchType!)
  ) {
    let counter = 0;
    while (totalNames! > 0) {
      arrayNamePage.push(counter);
      totalNames! -= 5;
      counter++;
    }
  }

  const handleNamePage = async (key: number) => {
    setNamePageCount(key);
    await refetch();
  };

  return (
    <div className="flex justify-center ">
      <div className="flex items-start flex-col bg-white w-9/12 p-2 mt-3 rounded-lg">
        <h1 className="text-4xl">Search: "{searchText}"</h1>
        {["all", "names"].includes(searchType!) && searchList?.names && (
          <div className="w-full mt-10">
            <h1 className="text-2xl mb-5">People</h1>
            <div>
              {searchList.names.length === 0 ? (
                <h2>No match</h2>
              ) : (
                searchList.names.map((name) => (
                  <div
                    className="border-b-2 mb-2 border-gray-300"
                    key={name.id}
                  >
                    <p className="text-xl">
                      <Link
                        className="hover:text-gray-300"
                        to={`../names/${name.id}`}
                      >
                        {name.fullName}
                      </Link>
                    </p>
                  </div>
                ))
              )}
              <div className="flex justify-center">
                {searchList.names.length !== 0 &&
                  arrayNamePage.map((page) => (
                    <button
                      key={page}
                      className={`hover:underline p-1 ${
                        namePageCount === page && "font-bold"
                      }`}
                      onClick={() => handleNamePage(page)}
                    >
                      {page + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {["all", "movieTitle"].includes(searchType!) && searchList?.movies && (
          <div className="mt-20 w-full">
            <h1 className="text-2xl mb-5">Titles</h1>
            <div>
              {searchList.movies.length === 0 ? (
                <h2>No match</h2>
              ) : (
                searchList.movies.map((movie) => (
                  <div
                    className="border-b-2 mb-2 border-gray-300"
                    key={movie.id}
                  >
                    <Link
                      className="hover:text-gray-300 text-xl"
                      to={`../movies/${movie.id}`}
                    >
                      <p>{movie.title}</p>
                      <p className="text-gray-300">
                        {dayjs(movie.releaseDate).format("YYYY")}
                      </p>
                    </Link>
                  </div>
                ))
              )}
              <div className="flex justify-center">
                {searchList.movies.length !== 0 &&
                  arrayMoviePage.map((page) => (
                    <button
                      key={page}
                      className={`hover:underline p-1 ${
                        titlePageCount === page && "font-bold"
                      }`}
                      onClick={() => handleMoviePage(page)}
                    >
                      {page + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
