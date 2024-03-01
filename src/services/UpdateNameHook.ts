import { useMutation } from "react-query";
import { Name } from "./NamePostHook";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const UpdateNameHook = (nameId: string) => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: Name) =>
    fetch(`http://localhost:5000/names/${nameId}`, {
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

export default UpdateNameHook;
