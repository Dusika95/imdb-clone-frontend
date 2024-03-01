import { Link, useNavigate } from "react-router-dom";
import Logo from "../pictures/clone-logo.png";
import { SearchBar } from "./SearchMenu";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function Header() {
  console.info("Header component rendered.");

  const { logout, isAuthenticated, hasRole } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function anonymousMenuItems() {
    return (
      <div className="text-xl">
        <Link className="p-2 hover:text-amber-400" to={"/register"}>
          Register
        </Link>
        <Link className="p-2 hover:text-amber-400" to={"/login"}>
          Login
        </Link>
      </div>
    );
  }

  function authenticatedMenuItems() {
    return (
      <div className="text-xl">
        {hasRole("editor") && (
          <>
            <Link className="p-2 hover:text-amber-400" to={"/create"}>
              Create Movies/Names
            </Link>
          </>
        )}
        {hasRole("admin") && (
          <Link className="p-2 hover:text-amber-400" to={"/create-users"}>
            Create Internals
          </Link>
        )}
        <Link className="p-2 hover:text-amber-400" to={"/profile"}>
          Profile
        </Link>
        <button onClick={handleLogout} className="p-2 hover:text-amber-400">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="text-white flex bg-black items-center h-28 justify-around">
      <Link className="space-x-0.5" to={"/"}>
        <img className="size-2/4" id="logo" src={Logo} alt="logo-pic" />
      </Link>
      <SearchBar />
      {isAuthenticated ? authenticatedMenuItems() : anonymousMenuItems()}
    </div>
  );
}
