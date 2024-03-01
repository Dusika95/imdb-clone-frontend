<<<<<<< HEAD
import { useQuery, useMutation } from "react-query";
import { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
=======
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import GetReviews from "../component/getReviews";
import CreateReview from "../component/createReview";
import { AuthContext } from "../AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateMovie from "../component/UpdateMovie";
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30

export interface Member {
  id: number;
  fullName: string;
  role: string;
}
export interface Movie {
  title: string;
  rating: number;
  description: string;
<<<<<<< HEAD
  releaseDate: string;
=======
  releaseDate: Date;
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  castAndCrew: Member[];
}
interface MovieError {
  message: string;
}

export default function MovieDetails() {
<<<<<<< HEAD
  const { id } = useParams<{ id: string }>();
=======
  const { hasRole } = useContext(AuthContext);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  const {
    isLoading,
    data: movie,
    error,
<<<<<<< HEAD

=======
    refetch,
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    isFetching,
  } = useQuery<Movie, MovieError>(["movie", id], () =>
    fetch(`http://localhost:5000/movies/${id}`, {
      method: "GET",
    }).then((res) => res.json())
  );
<<<<<<< HEAD
=======

  useEffect(() => {
    refetch();
  }, [triggerRefetch, refetch]);

>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured : {error.message}</div>;

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center bg-inherit">
      {movie === undefined ? (
        <h1>No data in database</h1>
      ) : (
        <div className="bg-white py-2 px-2 rounded mt-3">
          <p>{movie.title}</p>
          <p>Rating: {movie.rating}</p>
          <h1>Story Line:</h1>
          <p>{movie.description}</p>
          <p>release: {dayjs(movie.releaseDate).format("YYYY")}</p>
          <hr className="bg-slate-900 h-0.5"></hr>
          <h1>Cast:</h1>
          {movie.castAndCrew.map((member) => (
            <div>
              <p>
                {member.fullName}, {member.role}
              </p>
            </div>
          ))}
        </div>
      )}
=======
    <div className="flex justify-around">
      <div className="flex items-center flex-col ml-3 mt-3 w-5/12">
        {edit ? (
          <UpdateMovie
            movieId={id!}
            movieData={movie!}
            onClose={() => {
              setEdit(!edit);
            }}
            onUpdate={() => {
              setTriggerRefetch(!triggerRefetch);
            }}
          />
        ) : movie === undefined ? (
          <h1>No data in database</h1>
        ) : (
          <div className="w-full">
            <h1 className="text-amber-400 text-2xl">Movie details</h1>
            <div className="bg-white py-2 px-2 rounded mt-3">
              <p className="text-xl">{movie.title}</p>
              <h1>⭐{movie.rating}/5</h1>
              <h1 className="text-xl">Story Line:</h1>
              <p>{movie.description}</p>
              <p className="mt-1">
                release: {dayjs(movie.releaseDate).format("YYYY")}
              </p>
              <hr className="bg-slate-900 h-0.5"></hr>
              <h1>Cast:</h1>
              {movie.castAndCrew.map((member) => (
                <div key={member.id}>
                  <p>
                    <Link
                      className="hover:underline"
                      to={`/names/${member.id}`}
                    >
                      {member.fullName}
                    </Link>{" "}
                    , {member.role}
                  </p>
                </div>
              ))}
              {hasRole("editor") && (
                <button
                  onClick={() => setEdit(true)}
                  className="bg-amber-400 p-2 rounded mt-2"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
        {hasRole("user") && (
          <CreateReview
            movieId={id!}
            handleReviewCreated={() => {
              setTriggerRefetch(!triggerRefetch);
            }}
          />
        )}
      </div>
      <GetReviews movieId={id!} triggerRefetch={triggerRefetch} />
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    </div>
  );
}
