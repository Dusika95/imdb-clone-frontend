import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const DeleteReview = ({ reviewId }: { reviewId: number }) => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation(() =>
    fetch(`http://localhost:5000/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json())
  );
  return mutation;
};

export default DeleteReview;
