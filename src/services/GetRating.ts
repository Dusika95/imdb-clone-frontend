import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

interface Rating {
  id: number;
  score: number;
  userId: number;
  movieId: number;
  reviewId?: number;
}
interface RatingError {
  message: string;
}
const GetRating = ({ movieId }: { movieId: number }) => {
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    data: rating,
    error,
    refetch,
    isFetching,
  } = useQuery<Rating, RatingError>("rating", () =>
    fetch(`http://localhost:5000/ratings?movieId=${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json())
  );
  return { isLoading, rating, error, refetch, isFetching };
};
export default GetRating;
