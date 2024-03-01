import { useQuery } from "react-query";

export interface Name {
  id: number;
  fullName: string;
  description: string;
  movies: { movieId: number; movieTitle: string; role: string }[];
}

interface NameError {
  message: string;
}

const GetName = ({ nameId }: { nameId: string }) => {
  const {
    isLoading,
    data: name,
    refetch,
    error,
    isFetching,
  } = useQuery<Name, NameError>("name", () =>
    fetch(`http://localhost:5000/names/${nameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );
  return { isLoading, name, error, refetch, isFetching };
};
export default GetName;
