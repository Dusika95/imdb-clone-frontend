import { useQuery, useMutation } from "react-query";
import { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import Logo from "../pictures/clone-logo.png";
import MagnifyingGlass from "../pictures/1200px-Magnifying_glass_icon.svg.png";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("all");

  const handleSearch = () => {
    SearchList(searchText, searchType);
  };

  return (
    <div className="text-white flex space-x-4 bg-black py-5">
      <Link className="space-x-0.5" to={"/"}>
        <img className="size-3/4" id="logo" src={Logo} alt="logo-pic" />
      </Link>
      <form className="space-x-0.5">
        <select
          className="text-black m-0"
          name="search-type"
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="movieTitle">Movie Title</option>
          <option value="names">Celebs</option>
        </select>
        <input
          className="m-0"
          type="text"
          placeholder="search here"
          required
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="text-black bg-white m-0"
          type="button"
          onClick={handleSearch}
        >
          {/*<img id="magni" src={MagnifyingGlass} alt="search" />*/}
          search
        </button>
      </form>
      <Link className="space-x-24" to={"/register"}>
        Register
      </Link>
      <Link className="space-x-2" to={"/login"}>
        Login
      </Link>
    </div>
  );
}
