import { useForm, SubmitHandler } from "react-hook-form";
import UserPostHook, { InternalUser } from "../services/UserPostHook";
import { useState } from "react";

export default function CreateInternals() {
  const { mutateAsync } = UserPostHook();

  const [created, setCreated] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InternalUser>();

  const onSubmit: SubmitHandler<InternalUser> = async (data) => {
    console.log(data);
    const response = await mutateAsync(data as InternalUser);
    if (response.status >= 400) {
      console.log("hiba");
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
    }
    setCreated(true);
    setValue("nickName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  const onClick = () => {
    setCreated(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-amber-400 text-2xl p-4">
        Create new member to the team
      </h1>
      <form
        className="flex flex-col w-2/6 bg-white rounded-lg p-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col" onClick={onClick}>
          <label>Nickname:</label>
          <input
            className="border-2 rounded p-1 mb-2"
            type="text"
            placeholder="Jane Doe"
            {...register("nickName", {
              required: "this field is required",
              minLength: { value: 3, message: "min length is 3" },
            })}
          />
          {errors.nickName?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>email:</label>
          <input
            className="border-2 rounded p-1 mb-2"
            type="email"
            placeholder="JaneDoe@email.com"
            {...register("email", {
              required: "this field is required",
              minLength: { value: 3, message: "min length is 3" },
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>Role:</label>
          <select
            {...register("role", {
              required: "this field is required",
            })}
            className="border-2 rounded p-1 mb-2"
            defaultValue="none"
          >
            <option value="none" disabled={true}>
              -- select an option --
            </option>
            <option value="editor">Editor</option>
            <option value="moderator">Moderator</option>
          </select>
          {errors.email?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>password:</label>
          <input
            className="border-2 rounded p-1 mb-2"
            type="password"
            placeholder="*******"
            {...register("password", {
              required: "this field is required",
              minLength: { value: 3, message: "min length is 3" },
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>password conf:</label>
          <input
            className="border-2 rounded p-1 mb-2"
            type="password"
            placeholder="*******"
            {...register("confirmPassword", {
              required: "this field is required",
              minLength: { value: 3, message: "min length is 3" },
            })}
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
        </div>
        {created && <p className="text-lime-500 italic"></p>}
        <button className="bg-amber-400 p-2 rounded-xl mt-2" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
