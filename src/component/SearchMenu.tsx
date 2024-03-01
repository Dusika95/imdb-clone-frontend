import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("all");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      pathname: "search",
      search: createSearchParams({
        searchText: searchText,
        searchType: searchType,
      }).toString(),
    });
    //navigate(`/search?searchType=${searchType}&searchText=${searchText}`);
  };
  return (
    <form onSubmit={handleSearch} className="flex">
      <select
        className="text-black rounded-lg text-start mr-3"
        name="searchType"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option className="rounded-lg" value="all">
          All
        </option>
        <option value="movieTitle">Movie Title</option>
        <option value="names">Celebs</option>
      </select>
      <input
        className="m-0 text-black rounded-l-lg p-2"
        type="text"
        placeholder="search here"
        name="searchText"
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="text-black bg-white m-0 rounded-r-lg p-2"
        type="submit"
      >
        🔍
      </button>
    </form>
  );
}
