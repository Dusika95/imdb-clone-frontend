import { useMutation } from "react-query";

const DeleteRating = ({
  token,
  ratingId,
}: {
  token: string;
  ratingId: number;
}) => {
  const mutation = useMutation(() =>
    fetch(`http://localhost:5000/reviews/${ratingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json())
  );
  return mutation;
};

export default DeleteRating;
