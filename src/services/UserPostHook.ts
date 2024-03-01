import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

type role = "editor" | "moderator";

export interface InternalUser {
  nickName: string;
  email: string;
  role: role;
  password: string;
  confirmPassword: string;
}

const UserPostHook = () => {
  const { token } = useContext(AuthContext);

  const mutation = useMutation((data: InternalUser) =>
    fetch(`http://localhost:5000/users`, {
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
export default UserPostHook;
