import { useParams } from "react-router-dom";
import GetName from "../services/GetName";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useEffect, useState } from "react";
import UpdateName from "../component/UpdateName";

export default function NameDetails() {
  const { id } = useParams<{ id: string }>();
  const { hasRole } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const { isLoading, name, error, refetch, isFetching } = GetName({
    nameId: id!,
  });

  useEffect(() => {
    refetch();
  }, [refetch, edit]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-9/12">
        {edit === false ? (
          <div className="bg-white border-2 rounded border-amber-400 mr-2 px-2 py-2 w-full mt-3">
            <h1 className="text-3xl">{name?.fullName}</h1>
            <br />
            <h1>{name?.description}</h1>
            {hasRole("editor") && (
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="bg-slate-900 p-2 mt-3 rounded text-white hover:text-amber-400"
              >
                edit
              </button>
            )}
          </div>
        ) : (
          <UpdateName
            nameData={name!}
            nameId={id!}
            onClose={() => {
              setEdit(false);
            }}
            onUpdate={() => {
              setEdit(false);
            }}
          />
        )}
        <h1 className="text-2xl text-white">Work in movies:</h1>
        <div className="flex flex-wrap justify-center">
          {name?.movies.map((movie) => (
            <Link
              className="bg-white flex flex-col justify-between border-2 rounded border-amber-400 mr-2 px-2 py-2 w-1/6 h-36 mt-3"
              to={`../../movies/${movie.movieId}`}
            >
              <h1>{movie.movieTitle}</h1>
              <h1 className="text-xl">{movie.role}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
