import { useEffect, useState } from "react";
import { useQuery } from "react-query";
//import { useState } from "react";

export interface ReviewList {
  pageIndex: number;
  pageCount: number;
  total: number;
  data: Review[];
}
export interface Review {
  creatorName: string;
  movieTitle: string;
  text: string;
  reviewTitle: string;
  hasSpoiler: boolean;
}
interface ReviewError {
  message: string;
}

const handleClick = () => {
  console.log("klikk");
};

//?userId=1&movieId=1&hideSpoilers=false&pageCount=10&pageIndex=0
export default function GetReviews({
  movieId,
  triggerRefetch,
}: {
  movieId?: string;
  triggerRefetch: boolean;
}) {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const {
    isLoading,
    data: reviews,
    error,
    refetch,
    isFetching,
  } = useQuery<ReviewList, ReviewError>(
    ["reviews", movieId, pageIndex],
    ({ queryKey }) =>
      fetch(
        `http://localhost:5000/reviews?movieId=${queryKey[1]}&pageIndex=${queryKey[2]}`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [triggerRefetch, refetch]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;
  //console.log(reviews?.data[0].hasSpoiler)//wtf 1-et ír a console
  let count = reviews!.total;
  const arrayPage = [];
  if (reviews!.total / reviews!.pageCount > 0) {
    let counter = 0;
    while (count > 0) {
      arrayPage.push(counter);
      count -= reviews!.pageCount;
      counter++;
    }
  }

  const handlePaging = async (key: number) => {
    setPageIndex(key);
    await refetch();
  };

  return (
    <div className="flex justify-center mr-3 mt-3 w-5/12">
      {reviews?.data.length === 0 ? (
        <div className="mt-5">
          <h1 className="text-white">
            Be the first who writte a review to this movie
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-white">Reviews</h1>
          <div className="bg-amber-400 py-2 px-2 rounded mt-3 min-w-96">
            {reviews?.data.map((review, index) => (
              <div key={index}>
                <div className=" flex py-1 px-1 rounded mt-0.5">
                  <h1 className="mr-5">{review.creatorName}</h1>
                  <div className="text-slate-900">
                    <h1>{review.reviewTitle}</h1>
                    <hr className="bg-slate-900  text-slate-900 h-0.5 border-amber-400"></hr>
                    {review.hasSpoiler === true ? (
                      <button onClick={handleClick}>show review</button>
                    ) : (
                      <p>{review.text}</p>
                    )}
                  </div>
                </div>
                <hr className="bg-slate-900 text-slate-900 h-0.5 border-amber-400"></hr>
              </div>
            ))}
            <div className="flex justify-center">
              {arrayPage.map((pageNumb) => (
                <button
                  key={pageNumb}
                  onClick={() => handlePaging(pageNumb)}
                  className={`p-1 hover:underline ${
                    pageIndex === pageNumb && "font-bold"
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
