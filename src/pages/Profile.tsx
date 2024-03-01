import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import GetReviewsByUser from "../component/getReviewsByUser";
import DeleteProfile from "../services/DeleteProfile";
import UpdateProfile from "../services/UpdateProfile";
import { UserUpdate } from "../services/UpdateProfile";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

interface User {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}
interface UserError {
  message: string;
}

export default function Profile() {
  const { user, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const { mutateAsync: updateMutate } = UpdateProfile({
    token: token!,
  });
  const { mutateAsync: deleteMutate } = DeleteProfile({
    token: token!,
  });

  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changed, setChanged] = useState(false);

  const handlePassword = () => {
    setChangePassword(!changePassword);
    setChangeEmail(false);
    setChanged(false);
  };

  const handleEmail = () => {
    setChangeEmail(!changeEmail);
    setChangePassword(false);
    setChanged(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserUpdate>();

  const {
    isLoading,
    data: userData,
    error,
    refetch,
    isFetching,
  } = useQuery<User, UserError>("user", () =>
    fetch(`http://localhost:5000/users/${user!.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json())
  );

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occured: {error.message}</div>;

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    if (data.password) {
      data.email = user!.email;
    }

    const response = await updateMutate(data as UserUpdate);

    if (response.status >= 400) {
      console.log("hiba");
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
    }
    setChanged(true);
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setChangeEmail(false);
    setChangePassword(false);
    refetch();
  };

  const handleDelete = () => {
    deleteMutate();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-around">
      <div className="w-5/12">
        <h1 className="text-2xl text-white">Profile data</h1>
        <div className="bg-white p-2 mt-3 rounded">
          <h1>
            Email adress: {userData?.email}{" "}
            <button
              onClick={handleEmail}
              className="border-2 rounded bg-amber-400 py-2 px-2 border-none"
            >
              {changeEmail ? <p>close</p> : <p>change</p>}
            </button>
          </h1>
          {changeEmail && (
            <div>
              <h1>New Email</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="border-2 rounded mr-1"
                  placeholder="newemail@email.com"
                  type="email"
                  {...register("email")}
                />
                <button className="border-2 rounded bg-amber-400 py-2 px-2 border-none">
                  submit
                </button>
                {errors.email?.type === "required" && (
                  <p className="text-red-600 mb-1 italic" role="alert">
                    field is required
                  </p>
                )}
              </form>
            </div>
          )}
          <h1>Nickname: {userData?.nickName}</h1>
          {changePassword ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>new password</label>
                <div>
                  <input
                    className="border-2 rounded mb-1"
                    {...register("password", { required: "this is required" })}
                    type="password"
                    placeholder="*******"
                  />
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-600 mb-1 italic" role="alert">
                    field is required
                  </p>
                )}
                <label>password confirm</label>
                <div>
                  <input
                    className="border-2 rounded mb-1"
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="*******"
                  />
                </div>
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-600 mb-1 italic" role="alert">
                    field is required
                  </p>
                )}
                <p
                  className="cursor-pointer hover:underline"
                  onClick={handlePassword}
                >
                  close
                </p>
                <button className="border-2 rounded bg-amber-400 py-2 px-2 border-none">
                  submit
                </button>
              </form>
            </div>
          ) : (
            <div>
              {changed && <div className="text-lime-500">Data is changed</div>}
              <button
                onClick={handlePassword}
                className=" mt-2 border-2 rounded bg-amber-400 py-2 px-2 border-none"
              >
                change password
              </button>
            </div>
          )}
          <div>
            <button
              className="bg-red-600 p-2 rounded-md mt-2"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      {user && <GetReviewsByUser userId={user.id} />}
    </div>
  );
}
