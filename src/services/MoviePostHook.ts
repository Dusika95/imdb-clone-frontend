import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export type role = "actor" | "director" | "writer" | "composer";

export interface castAndCrew {
  nameId: number;
  role: role;
}

export interface Movie {
  title: string;
  releaseDate: Date;
  description: string;
  castAndCrew: castAndCrew[];
}

const MoviePostHook = () => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: Movie) =>
    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
  );
  return mutation;
};

export default MoviePostHook;
