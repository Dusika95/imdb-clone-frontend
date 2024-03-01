import { useQuery } from "react-query";

export interface SearchList{
    totalNames?: number;
    totalMovies?: number;
    namePageIndex?: number;
    moviePageIndex?: number;
    names?: Name[];
    movies?: Movie[];
  }
  export interface Name {
    id: number;
    fullName: string;
  }
  export interface Movie {
    id: number;
    title: string;
    releaseDate: string;
  }
  
  export interface ListError {
    message: string;
  }
const SearchService=({searchText,searchType,pageIndexName,pageIndexMovie}:{searchText:string,searchType:string,pageIndexName:number,pageIndexMovie:number})=>{
  const {
    isLoading,
    data: searchList,
    error,
    refetch,
    isFetching,
  } = useQuery<SearchList, ListError>(
    ["searchList", searchText, searchType, pageIndexMovie ,pageIndexName],
    ({queryKey}) =>
      fetch(
        `http://localhost:5000/search?searchText=${queryKey[1]}&searchType=${queryKey[2]}&pageIndexMovie=${queryKey[3]}&pageIndexName=${queryKey[4]}`,
        {
          method: "GET",
        }
      ).then((res) => res.json()),
    {
      enabled: searchText!.trim() !== "",
      
    }
  );
  return {isLoading,searchList,error,refetch, isFetching}
}

export default SearchService