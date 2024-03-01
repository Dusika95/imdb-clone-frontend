<<<<<<< HEAD
import { useQuery, useMutation } from "react-query";
import { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function Register() {
  const mutation = useMutation((data) =>
=======
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface User {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}
export default function Register() {
  const mutation = useMutation((data: User) =>
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
<<<<<<< HEAD
    }).then((res) => res.json())
  );
  const [user, setUser] = useState({
    email: "",
    nickName: "",
    password: "",
    confirmPassword: "",
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    mutation.mutate(user as any);
    console.log(event);
  };
  return (
    <div className="flex justify-center ">
      <form className="bg-slate-50 px-4 py-4 rounded mt-10" onSubmit={onSubmit}>
        <div className=" flex justify-center mb-3">
          <h1>Become new member of our comunity!</h1>
        </div>
        <div className="flex justify-between mb-2">
          <label>email</label>
          <input
            className="border-2 rounded ml-3"
            name="email"
            type="email"
            placeholder="email@email.com"
            required
            value={user.email}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex justify-between mb-2">
          <label>nickname</label>
          <input
            className="border-2 rounded"
            name="nickName"
            type="text"
            placeholder="Little Buddy"
            required
            value={user.nickName}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  nickName: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex justify-between mb-2">
          <label>password</label>
          <input
            className="border-2 rounded"
            name="password"
            type="password"
            placeholder="*******"
            required
            value={user.password}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex justify-between mb-2">
          <label>password conf. </label>
          <input
            className="border-2 rounded ml-3"
            name="confirmPassword"
            type="password"
            placeholder="*******"
            required
            value={user.confirmPassword}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  confirmPassword: e.target.value,
                };
              })
            }
          />
        </div>
=======
    })
  );

  const navigate = useNavigate();

  let errorText: string | undefined = undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await mutation.mutateAsync(data as User);

    if (response.status === 400) {
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
      errorText = errorMessage;
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flex justify-center">
      <form
        className="bg-slate-50 px-4 py-4 rounded mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex justify-center mb-3">
          <h1 className="">Become new member of our comunity!</h1>
        </div>
        <br />
        <div className="">
          <div className="flex justify-between mb-1">
            <label>email</label>
            <input
              className="border-2 rounded ml-3"
              type="email"
              placeholder="email@email.com"
              {...register("email", {
                required: "this is required",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
            />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <div className="flex justify-between mb-1">
            <label>nickname</label>
            <input
              className="border-2 rounded"
              {...register("nickName", {
                required: "this is required",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
              type="text"
              placeholder="Little Buddy"
            />
          </div>
          {errors.nickName?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <div className="flex justify-between mb-1">
            <label>password</label>
            <input
              className="border-2 rounded"
              {...register("password", {
                required: "this is required",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
              type="password"
              placeholder="*******"
            />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <div className="flex justify-between mb-1">
            <label>password conf. </label>
            <input
              className="border-2 rounded ml-3"
              {...register("confirmPassword", {
                required: "this is required",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
              type="password"
              placeholder="*******"
            />
          </div>
        </div>
        {errors.confirmPassword?.type === "required" && (
          <p className="text-red-600 mb-1 italic" role="alert">
            field is required
          </p>
        )}
        <br />
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
        <div className="flex justify-center mb-2">
          <button className="border-2 rounded bg-amber-400 py-2 px-2 border-none">
            register
          </button>
        </div>
<<<<<<< HEAD
=======
        <br />
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
        <div className="text-xs flex justify-center items-center ">
          Do you already have account?{" "}
          <Link to={"/login"}>
            <button className="border-2 rounded text-white bg-slate-900 py-2 px-2 border-none">
              log in here
            </button>
          </Link>
        </div>
      </form>
<<<<<<< HEAD
=======
      {errorText && <p>{errorText}</p>}
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    </div>
  );
}
