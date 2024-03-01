import { useForm, SubmitHandler } from "react-hook-form";
import UpdateNameHook from "../services/UpdateNameHook";
import { Name } from "../services/NamePostHook";
import { useEffect } from "react";

export default function UpdateName({
  nameId,
  nameData,
  onClose,
  onUpdate,
}: {
  nameId: string;
  nameData: Name;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const { mutateAsync } = UpdateNameHook(nameId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Name>();

  useEffect(() => {
    setValue("fullName", nameData.fullName);
    setValue("description", nameData.description);
  }, []);

  const watchDescription = watch("description")
    ? watch("description").length
    : "";

  const onSubmit: SubmitHandler<Name> = async (data) => {
    const response = await mutateAsync(data as Name);
    if (response.status >= 400) {
      const errorMessage = (await response.json())[0].path;
      alert(errorMessage);
    }
    onUpdate();
    onClose();
  };

  const handleUpdateClose = () => {
    onClose();
  };
  return (
    <div className="flex flex-col items-start rounded-lg mt-3 bg-white p-5">
      <h1 className="text-2xl mb-3">Edit name</h1>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          className="rounded p-1 w-2/4 border-2 border-black"
          {...register("fullName", { required: "it is required" })}
        />
        {errors.fullName?.type === "required" && (
          <p className="text-red-600 mb-1 italic" role="alert">
            field is required
          </p>
        )}
        <label>Description</label>
        <textarea
          className="p-1 rounded w-full border-2 border-black"
          placeholder="Description here...."
          rows={6}
          cols={70}
          {...register("description", {
            required: "it is required",
            maxLength: 2000,
          })}
        ></textarea>
        {errors.description?.type === "required" && (
          <p className="text-red-600 mb-1 italic" role="alert">
            field is required
          </p>
        )}
        {errors.description?.type === "maxLength" && (
          <p className="text-red-600 mb-1 italic" role="alert">
            it contains more than 2000 char.
          </p>
        )}
        {typeof watchDescription === "number" && watchDescription > 1750 && (
          <p className="text-red-600 mb-1 italic">
            description can be store 2000 char you already writte
            {watchDescription}
          </p>
        )}
        <div>
          <button
            className="bg-amber-400 text-black p-2 mt-3 rounded-md"
            type="submit"
          >
            submit
          </button>
          <button className="ml-1 hover:underline" onClick={handleUpdateClose}>
            close edit
          </button>
        </div>
      </form>
    </div>
  );
}
