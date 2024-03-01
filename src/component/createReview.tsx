import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import CreateRating from "./createRating";
import GetRating from "../services/GetRating";
import GetReviewsByUserHook from "../services/GetReviewsByUserHook";
import EditReview, { editStance } from "./EditReview";
import { AuthContext } from "../AuthContext";
import DeleteReview from "../services/DeleteReview";

interface Review {
  movieId: number;
  text: string;
  title: string;
  hasSpoiler: boolean;
  rating: number;
}

export default function CreateReview({
  movieId,
  handleReviewCreated,
}: {
  movieId: string;
  handleReviewCreated: () => void;
}) {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [triggerRefetchReview, setTriggerRefetchReview] = useState(false);

  const { user, token } = useContext(AuthContext);

  const { rating, refetch: ratingRefetch } = GetRating({
    movieId: Number(movieId),
  });

  const { reviews, refetch: reviewRefetch } = GetReviewsByUserHook({
    movieId: movieId,
    userId: user!.id,
    pageIndex: 0,
  });

  function getId() {
    return reviews && reviews.data && reviews.data.length > 0
      ? reviews.data[0].id
      : 0;
  }

  const { mutateAsync: deleteMutate } = DeleteReview({
    reviewId: getId(),
  });

  useEffect(() => {
    reviewRefetch();
    handleEdit({
      show: false,
      id: 0,
      movieId: 0,
      text: "",
      title: "",
      rating: 0,
    });
    handleReviewCreated();
  }, [reviewRefetch, triggerRefetchReview, triggerRefetch]);

  useEffect(() => {
    ratingRefetch();
  }, [triggerRefetch, ratingRefetch, movieId]);

  const ratingExist = rating?.id || 0;

  const [edit, setEdit] = useState<editStance>({
    show: false,
    id: 0,
    movieId: 0,
    text: "",
    title: "",
    rating: 0,
  });

  const mutation = useMutation((data: Review) =>
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      handleReviewCreated();
      return resp;
    })
  );

  const [score, setScore] = useState(0);

  const handleStarClick = (value: number) => {
    setScore(value);
  };

  const handleDelete = async () => {
    await deleteMutate();
    handleReviewCreated();
    await reviewRefetch();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Review>();

  const watchText = watch("text") ? watch("text").length : "";

  const onSubmit: SubmitHandler<Review> = async (data) => {
    data.hasSpoiler = !!data.hasSpoiler;
    data.movieId = Number(movieId);
    data.rating = score;
    const response = await mutation.mutateAsync(data as Review);
    setValue("text", "");
    setValue("title", "");
    if (response.status >= 400) {
      console.log("hiba");
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
    }
    reviewRefetch();
    ratingRefetch();
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

  return (
    <div className="bg-white mt-6 p-2 rounded w-full">
      <div className="flex align-middle">
        {ratingExist > 0 ? (
          <div className="flex flex-col">
            <div className="flex">
              <p className="pt-2 mr-1">your rating: </p>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  className="text-amber-300  text-3xl cursor-pointer"
                  key={value}
                >
                  {value <= rating!.score ? "★" : "☆"}
                </span>
              ))}
            </div>
            <div>
              <CreateRating
                movieId={movieId!}
                ratingId={ratingExist}
                handleRatingCreated={() => {
                  setTriggerRefetch(!triggerRefetch);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex">
            <h1 className="pt-2 mr-1">Rate this movie </h1>
            <CreateRating
              movieId={movieId!}
              ratingId={ratingExist}
              handleRatingCreated={() => {
                setTriggerRefetch(!triggerRefetch);
              }}
            />
          </div>
        )}
      </div>
      {reviews?.data[0] ? (
        <div>
          <h1 className="text-black text-2xl">Your review</h1>
          <div className="bg-amber-400 py-2 px-2 rounded mt-3">
            <div key={reviews?.data[0].id}>
              <div className=" flex py-1 px-1 rounded mt-0.5">
                <h1 className="mr-5 w-2/12">{reviews?.data[0].movieTitle}</h1>
                {edit.show ? (
                  <div>
                    <EditReview
                      editInput={edit}
                      handleReviewEdit={() => {
                        setTriggerRefetchReview(!triggerRefetchReview);
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
                    <h1>{reviews.data[0].reviewTitle}</h1>
                    <hr className="bg-slate-900 text-slate-900 h-0.5 border-amber-400"></hr>
                    <p className="w-full">{reviews.data[0].text}</p>
                    <div>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span className="text-amber-300  text-3xl" key={value}>
                          {value <= reviews.data[0].rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <button
                      className="hover:underline"
                      onClick={() =>
                        handleEdit({
                          show: true,
                          id: reviews.data[0].id,
                          movieId: reviews.data[0].movieId,
                          text: reviews.data[0].text,
                          title: reviews.data[0].reviewTitle,
                          rating: reviews.data[0].rating,
                        })
                      }
                    >
                      edit
                    </button>
                    <button
                      className="hover:underline bg-red-600 rounded-md p-2 ml-2"
                      onClick={() => handleDelete()}
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label>or create review</label>
          <input
            className="placeholder:italic placeholder:text-slate-600 bg-amber-400 border-solid border-2 border-slate-900 mt-2 p-1 rounded"
            placeholder="review title"
            {...register("title", { required: "this is required" })}
          />
          {errors.title?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <textarea
            className="placeholder:italic placeholder:text-slate-600 bg-amber-400 border-solid border-2 border-slate-900 mt-2 p-1 rounded-sm"
            {...register("text", {
              required: "this is required",
              maxLength: 250,
            })}
            rows={6}
            cols={70}
            placeholder="review content"
          ></textarea>
          {errors.text?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          {errors.text?.type === "maxLength" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              it contains more than 250 char.
            </p>
          )}
          {typeof watchText === "number" && watchText > 200 && (
            <p className="text-red-600 mb-1 italic">
              review can be store 250 char you already writte {watchText}
            </p>
          )}
          <div>
            <input type="checkbox" {...register("hasSpoiler")} />
            <label className=""> spoiler alert</label>
          </div>
          <div className="">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                className="text-amber-300  text-3xl cursor-pointer"
                key={value}
                onClick={() => handleStarClick(value)}
              >
                {value <= score ? "★" : "☆"}
              </span>
            ))}
          </div>
          <button className="border-2 rounded text-white bg-slate-900 py-2 px-2 border-none">
            post
          </button>
        </form>
      )}
    </div>
  );
}
