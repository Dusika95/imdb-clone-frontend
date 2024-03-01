import { useQuery } from "react-query";
// import { useContext } from "react";
// import { AuthContext } from "../AuthContext";

export interface GetName {
  id: number;
  fullName: string;
}
interface NamesError {
  message: string;
}

const GetNamesHook = () => {
  //   const { token } = useContext(AuthContext);

  const {
    isLoading,
    data: names,
    error,
    refetch,
    isFetching,
  } = useQuery<GetName[], NamesError>("names", () =>
    fetch("http://localhost:5000/names", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }).then((res) => res.json())
  );

  return { isLoading, names, error, refetch, isFetching };
};
export default GetNamesHook;
