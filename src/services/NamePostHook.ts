import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export interface Name {
  fullName: string;
  description: string;
}

const NamePostHook = () => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: Name) =>
    fetch("http://localhost:5000/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
  );
  return mutation;
};

export default NamePostHook;
