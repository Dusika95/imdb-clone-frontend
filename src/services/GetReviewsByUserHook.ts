import { useQuery } from "react-query";

export interface ReviewList {
  pageIndex: number;
  pageCount: number;
  total: number;
  data: Review[];
}
export interface Review {
  id: number;
  movieId: number;
  creatorName: string;
  movieTitle: string;
  text: string;
  reviewTitle: string;
  hasSpoiler: boolean;
  rating: number;
}
interface ReviewError {
  message: string;
}

const GetReviewsByUserHook = ({
  userId,
  pageIndex,
  movieId,
}: {
  userId: number;
  pageIndex: number;
  movieId: string;
}) => {
  const {
    isLoading,
    data: reviews,
    error,
    refetch,
    isFetching,
  } = useQuery<ReviewList, ReviewError>(
    ["reviews", userId, pageIndex, movieId],
    ({ queryKey }) =>
      fetch(
        `http://localhost:5000/reviews?userId=${queryKey[1]}&movieId=${queryKey[3]}`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
  );
  return { isLoading, reviews, error, refetch, isFetching };
};

export default GetReviewsByUserHook;
