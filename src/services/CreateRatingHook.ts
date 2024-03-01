import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export interface Rating {
  score: number;
  movieId: number;
}

const CreateRatingHook = () => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: Rating) =>
    fetch("http://localhost:5000/ratings", {
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
export default CreateRatingHook;
