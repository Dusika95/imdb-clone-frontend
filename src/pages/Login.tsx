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
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useContext(AuthContext);

  const mutation = useMutation((data: User) =>
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
    fetch("http://localhost:5000/login", {
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
    password: "",
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
          <h1>Log in and enjoy our content!</h1>
        </div>
=======
    })
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await mutation.mutateAsync(data as User);

    if (response.status >= 400) {
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
    } else {
      const responseData = await response.json();
      login(responseData.accesToken);
      // const decoded = jwtDecode(responseData.accesToken);
      // sessionStorage.setItem("user", JSON.stringify(decoded));
      // sessionStorage.setItem("token", JSON.stringify(responseData.accesToken));
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center">
      <form
        className="bg-slate-50 px-4 py-4 rounded mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex justify-center mb-3">
          <h1 className="text-2xl">Log in and enjoy our content!</h1>
        </div>
        <br />
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
        <div className="flex justify-between mb-2">
          <label>email</label>
          <input
            className="border-2 rounded ml-3"
<<<<<<< HEAD
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
=======
            {...register("email", { required: "this is required" })}
            name="email"
            type="email"
            placeholder="email@email.com"
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
          />
        </div>
        <div className="flex justify-between mb-2">
          <label>password</label>
          <input
            className="border-2 rounded ml-3"
<<<<<<< HEAD
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

        <div className="flex justify-center mb-2">
          <button className="border-2 rounded bg-amber-400 py-2 px-2 border-none">
            register
          </button>
        </div>
        <div className="text-xs flex justify-center items-center ">
          Don't have an account?{" "}
=======
            {...register("password", { required: "this is required" })}
            type="password"
            placeholder="*******"
            required
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="text-red-600 mb-1 italic" role="alert">
            field is required
          </p>
        )}
        <br />
        <div className="flex justify-center mb-2">
          <button className="border-2 rounded bg-amber-400 py-2 px-2 border-none">
            login
          </button>
        </div>
        <br />
        <div className="text-xs flex justify-center items-center ">
          <p>Don't have an account?</p>
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
          <Link to={"/register"}>
            <button className="border-2 rounded text-white bg-slate-900 py-2 px-2 border-none">
              register here
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
