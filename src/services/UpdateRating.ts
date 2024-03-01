import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export interface RatingUpdate {
  score: number;
}

const UpdateRating = ({ ratingId }: { ratingId: number }) => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: RatingUpdate) =>
    fetch(`http://localhost:5000/ratings/${ratingId}`, {
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
export default UpdateRating;
