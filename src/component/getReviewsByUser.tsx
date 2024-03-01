import { useState } from "react";
import { useQuery } from "react-query";
import DeleteReview from "../services/DeleteReview";
import EditReview, { editStance } from "./EditReview";

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

export default function GetReviewsByUser({ userId }: { userId: number }) {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [edit, setEdit] = useState<editStance>({
    show: false,
    id: 0,
    movieId: 0,
    text: "",
    title: "",
    rating: 0,
  });

  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const { mutateAsync: deleteMutate } = DeleteReview({ reviewId: edit.id });

  const {
    isLoading,
    data: reviews,
    error,
    refetch,
    isFetching,
  } = useQuery<ReviewList, ReviewError>(
    ["reviews", userId, pageIndex],
    ({ queryKey }) =>
      fetch(
        `http://localhost:5000/reviews?userId=${queryKey[1]}&pageIndex=${queryKey[2]}`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
  );

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;

  let count = reviews!.total;
  const arrayPage = [];

  if (reviews!.total / reviews!.pageCount > 0) {
    let counter = 0;
    while (count > 0) {
      arrayPage.push(counter);
      count -= reviews!.pageCount;
      counter++;
    }

    const handlePaging = async (key: number) => {
      setPageIndex(key);
      await refetch();
    };

    const handleEdit = ({
      show,
      id,
      movieId,
      text,
      title,
      rating,
    }: editStance) => {
      setEdit({
        show: show,
        id: id,
        movieId: movieId,
        text: text,
        title: title,
        rating: rating,
      });
    };

    const handleDelete = (value: number) => {
      setEdit({
        show: edit.show,
        id: value,
        movieId: edit.movieId,
        text: edit.text,
        title: edit.title,
        rating: edit.rating,
      });
      deleteMutate();
    };

    return (
      <div className="w-5/12">
        {reviews?.data.length === 0 ? (
          <div className="mt-5">
            <h1 className="text-white">You never writte any review</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-amber-400 text-2xl">Reviews</h1>
            <div className="bg-amber-400 p-2 rounded mt-3">
              {reviews?.data.map((review) => (
                <div key={review.id}>
                  <div className=" flex p1 rounded mt-0.5">
                    <div className="w-3/12">
                      <h1>{review.movieTitle}</h1>
                    </div>
                    {edit.show === true && edit.id === review.id ? (
                      <div>
                        <EditReview
                          editInput={edit}
                          handleReviewEdit={() => {
                            setTriggerRefetch(!triggerRefetch);
                          }}
                        />
                        <button
                          className="hover:underline ml-2 bg-red-600 p-2 border-2 rounded border-none mt-1 ms-0"
                          onClick={() =>
                            handleEdit({
                              show: false,
                              id: 0,
                              movieId: 0,
                              text: "",
                              title: "",
                              rating: 0,
                            })
                          }
                        >
                          close edit
                        </button>
                      </div>
                    ) : (
                      <div className="text-slate-900 w-8/12">
                        <h1>{review.reviewTitle}</h1>
                        <hr className="bg-slate-900 text-slate-900 h-0.5 border-amber-400"></hr>
                        <p className="w-full">{review.text}</p>
                        <div>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              className="text-amber-300  text-3xl"
                              key={value}
                            >
                              {value <= review.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <button
                          className="hover:underline"
                          onClick={() =>
                            handleEdit({
                              show: true,
                              id: review.id,
                              movieId: review.movieId,
                              text: review.text,
                              title: review.reviewTitle,
                              rating: review.rating,
                            })
                          }
                        >
                          edit
                        </button>
                        <button
                          className="hover:underline bg-red-600 rounded-md p-2 ml-2"
                          onClick={() => handleDelete(review.id)}
                        >
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                  <hr className="bg-slate-900 text-slate-900 h-0.5 border-amber-400"></hr>
                </div>
              ))}
              <div className="flex justify-center">
                {arrayPage.map((pageNumb) => (
                  <button
                    key={pageNumb}
                    onClick={() => handlePaging(pageNumb)}
                    className={`mr-2 ${
                      pageIndex === pageNumb && "underline font-bold"
                    }`}
                  >
                    {pageNumb + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
