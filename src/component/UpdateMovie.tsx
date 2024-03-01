import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UpdateMovieHook from "../services/UpdateMovieHook";
import { Movie, castAndCrew, role } from "../services/MoviePostHook";
import Select from "react-select";
import GetNamesHook from "../services/GetNamesHook";
import { MovieInput, Optiontype } from "../pages/CreateMovieAndNamesPage";
import { Movie as MovieData } from "../pages/MovieDetails";
import { useEffect } from "react";

export default function UpdateMovie({
  movieId,
  movieData,
  onClose,
  onUpdate,
}: {
  movieId: string;
  movieData: MovieData;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const { mutateAsync } = UpdateMovieHook(movieId);
  const { isLoading, names } = GetNamesHook();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<MovieInput>();

  const deffaultDate = new Date(movieData.releaseDate)
    .toISOString()
    .substring(0, 10);

  function createMemberArrayByRole(role: string) {
    return movieData.castAndCrew
      .filter((member) => member.role === role)
      .map((memberType) => ({
        value: memberType.id,
        label: memberType.fullName,
      }));
  }

  useEffect(() => {
    if (movieData) {
      setValue("title", movieData.title);
      setValue("description", movieData.description);

      setValue("actors", createMemberArrayByRole("actor"));
      setValue("directors", createMemberArrayByRole("director"));
      setValue("writers", createMemberArrayByRole("writer"));
      setValue("composers", createMemberArrayByRole("composer"));
    }
  }, []);

  const watchDescription = watch("description")
    ? watch("description").length
    : "";

  function mapNames(names: Optiontype[], type: role) {
    return names.map((name) => ({
      nameId: name.value,
      role: type,
    }));
  }

  const onSubmit: SubmitHandler<MovieInput> = async (data) => {
    const actors: castAndCrew[] = mapNames(data.actors, "actor");
    const directors: castAndCrew[] = mapNames(data.directors, "director");
    const writers: castAndCrew[] = mapNames(data.writers, "writer");
    const composers: castAndCrew[] = mapNames(data.composers, "composer");

    const reqBody: Movie = {
      title: data.title,
      releaseDate: new Date(data.releaseDate),
      description: data.description,
      castAndCrew: [...actors, ...directors, ...composers, ...writers],
    };

    const response = await mutateAsync(reqBody as Movie);
    if (response.status >= 400) {
      const errorMessage = (await response.json())[0].message;

      alert(errorMessage);
    }
    onUpdate();
    onClose();
  };

  const namesOptions = names?.map((name) => ({
    value: name.id,
    label: name.fullName,
  }));

  const handleUpdateClose = () => {
    onClose();
  };

  return (
    <div className="w-full">
      <h1 className="text-amber-400 text-2xl">Modify movie</h1>
      <div className="bg-white py-2 px-2 rounded mt-3">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label>Movie title</label>
          <input
            className="rounded p-1 w-2/4 border border-black"
            type="text"
            placeholder="Movie title"
            {...register("title", {
              required: "this field is required",
            })}
          />
          {errors.title?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>Release Date</label>
          <input
            className="rounded p-1 w-2/4 border border-black"
            type="date"
            defaultValue={deffaultDate}
            {...register("releaseDate", {
              required: "this is required",
            })}
          />
          {errors.releaseDate?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>Storyline</label>
          <textarea
            className="p-1 rounded w-3/4 border border-black"
            placeholder="Story here...."
            rows={6}
            {...register("description", {
              required: "this is required",
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
              storyline can be store 2000 char you already writte
              {watchDescription}
            </p>
          )}
          <label>Actors</label>
          <Controller
            control={control}
            name="actors"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={namesOptions}
                isLoading={isLoading}
                onChange={onChange}
                isMulti={true}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
                className="w-3/4"
              />
            )}
          />
          {errors.actors?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>Directors</label>
          <Controller
            control={control}
            name="directors"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={namesOptions}
                isLoading={isLoading}
                onChange={onChange}
                isMulti={true}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
                className="w-3/4"
              />
            )}
          />
          {errors.directors?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <label>Writers</label>
          <Controller
            control={control}
            name="writers"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={namesOptions}
                isLoading={isLoading}
                onChange={onChange}
                isMulti={true}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
                className="w-3/4"
              />
            )}
          />
          {errors.writers?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}

          <label>Composers</label>
          <Controller
            control={control}
            name="composers"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={namesOptions}
                isLoading={isLoading}
                onChange={onChange}
                isMulti={true}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
                className="w-3/4"
              />
            )}
          />
          {errors.composers?.type === "required" && (
            <p className="text-red-600 mb-1 italic" role="alert">
              field is required
            </p>
          )}
          <div>
            <button className="bg-amber-400 p-2 mt-3 rounded-md" type="submit">
              submit
            </button>
            <button
              className="hover:underline p-2 mt-3 rounded-md"
              type="button"
              onClick={handleUpdateClose}
            >
              close edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
