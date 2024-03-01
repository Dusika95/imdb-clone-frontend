import { useState } from "react";
import CreateRatingHook, { Rating } from "../services/CreateRatingHook";
import UpdateRating, { RatingUpdate } from "../services/UpdateRating";

export default function CreateRating({
  movieId,
  ratingId,
  handleRatingCreated,
}: {
  movieId: string;
  ratingId: number;
  handleRatingCreated: () => void;
}) {
  const { mutateAsync: ratingCreate } = CreateRatingHook();
  const { mutateAsync: ratingUpdate } = UpdateRating({ ratingId: ratingId });

  const [score, setScore] = useState(0);

  const handleStarClick = (value: number) => {
    setScore(value);
  };

  const handleCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data: Rating = {
      score: score,
      movieId: Number(movieId),
    };

    //const response = await ratingCreate(data as Rating);

    const res = await ratingCreate(data as Rating).then((resp) => {
      handleRatingCreated();
      return resp;
    });
    if (res.status >= 400) {
      console.log("hiba");
      const errorMessage = (await res.json())[0].message;
      alert(errorMessage);
    }
  };

  const handleUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data: RatingUpdate = {
      score: score,
    };
    const res = await ratingUpdate(data as RatingUpdate).then((resp) => {
      handleRatingCreated();
      return resp;
    });

    // const response = await ratingUpdate(data as RatingUpdate);

    if (res.status >= 400) {
      console.log("hibaaa");
      const errorMessage = (await res.json())[0].message;
      alert(errorMessage);
    }
    setScore(0);
  };

  return (
    <div className=" flex ">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          className="text-amber-300 text-3xl cursor-pointer "
          key={value}
          onClick={() => handleStarClick(value)}
        >
          {value <= score ? "★" : "☆"}
        </span>
      ))}
      {ratingId == 0 ? (
        <button
          className="bg-amber-400 p-2 rounded-full hover:underline"
          onClick={handleCreate}
        >
          submit
        </button>
      ) : (
        <div>
          <button
            className="bg-amber-400 p-2 rounded-full hover:underline"
            onClick={handleUpdate}
          >
            change
          </button>
        </div>
      )}
    </div>
  );
}
