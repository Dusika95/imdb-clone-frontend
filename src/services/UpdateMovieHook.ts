import { useMutation } from "react-query";
import { Movie } from "./MoviePostHook";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const UpdateMovieHook = (movieId: string) => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: Movie) =>
    fetch(`http://localhost:5000/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
  );
  return mutation;
};

export default UpdateMovieHook;
