import { useState, useEffect /*useContext*/ } from "react";
import UpdateReview, { UpdatedReview } from "../services/UpdateReview";
import { useForm, SubmitHandler } from "react-hook-form";
//import { AuthContext } from "../AuthContext";

export interface editStance {
  show: boolean;
  id: number;
  movieId: number;
  text: string;
  title: string;
  rating: number;
}

export default function EditReview({
  editInput,
  handleReviewEdit,
}: {
  editInput: editStance;
  handleReviewEdit: () => void;
}) {
  const [score, setScore] = useState(0);
  const { mutateAsync: updateMutate } = UpdateReview({
    reviewId: editInput.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdatedReview>();

  const watchText = watch("text") ? watch("text").length : "";

  useEffect(() => {
    setValue("text", editInput.text);
    setValue("title", editInput.title);
    setScore(editInput.rating);
  }, []);

  const handleStarClick = (value: number) => {
    setScore(value);
  };

  const onSubmit: SubmitHandler<UpdatedReview> = async (data) => {
    data.movieId = editInput.movieId;
    data.rating = score;

    //const response = await updateMutate(data as UpdatedReview);
    const res = await updateMutate(data as UpdatedReview).then((resp) => {
      handleReviewEdit();
      return resp;
    });
    if (res.status >= 400) {
      console.log("hiba");
      const errorMessage = (await res.json())[0].message;
      alert(errorMessage);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <input
          type="text"
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
        <div>
          <button className="border-2 rounded text-white bg-slate-900 p-2 border-none">
            post
          </button>
        </div>
      </form>
    </div>
  );
}
