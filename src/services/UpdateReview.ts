import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export interface UpdatedReview {
  movieId: number;
  text: string;
  title: string;
  hasSpoiler: boolean;
  rating: number;
}

const UpdateReview = ({ reviewId }: { reviewId: number }) => {
  const { token } = useContext(AuthContext);
  const mutation = useMutation((data: UpdatedReview) =>
    fetch(`http://localhost:5000/reviews/${reviewId}`, {
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

export default UpdateReview;
