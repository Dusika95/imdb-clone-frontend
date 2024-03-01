import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MoviePostHook, {
  Movie,
  castAndCrew,
  role,
} from "../services/MoviePostHook";
import Select from "react-select";
import NamePostHook, { Name } from "../services/NamePostHook";
import GetNamesHook from "../services/GetNamesHook";

export interface Optiontype {
  value: number;
  label: string;
}
export interface MovieInput {
  title: string;
  releaseDate: Date;
  description: string;
  actors: { value: number; label: string }[];
  directors: { value: number; label: string }[];
  writers: { value: number; label: string }[];
  composers: { value: number; label: string }[];
}

export default function CreateMovieAndNamesPage() {
  const { mutateAsync: movieMutate } = MoviePostHook();
  const { mutateAsync: nameMutate } = NamePostHook();
  const { isLoading, names, refetch } = GetNamesHook();

  const {
    register: movieRegister,
    handleSubmit: movieHandleSubmit,
    setValue: movieSetValue,
    control,
    formState: { errors: movieErrors },
    watch: movieWatch,
  } = useForm<MovieInput>();

  const watchMovieDescription = movieWatch("description")
    ? movieWatch("description").length
    : "";

  const {
    register: nameRegister,
    handleSubmit: nameHandleSubmit,
    setValue: nameSetValue,
    formState: { errors: nameErrors },
    watch: nameWatch,
  } = useForm<Name>();

  const watchNameDescription = nameWatch("description")
    ? nameWatch("description").length
    : "";

  function mapNames(names: Optiontype[], type: role) {
    return names.map((name) => ({
      nameId: name.value,
      role: type,
    }));
  }
  const movieOnSubmit: SubmitHandler<MovieInput> = async (data) => {
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

    const response = await movieMutate(reqBody as Movie);

    if (response.status >= 400) {
      const errorMessage = (await response.json())[0].message;

      alert(errorMessage);
    }
    movieSetValue("title", "");
    movieSetValue("releaseDate", new Date(""));
    movieSetValue("description", "");
    movieSetValue("actors", []);
    movieSetValue("directors", []);
    movieSetValue("writers", []);
    movieSetValue("composers", []);
  };
  const nameOnSubmit: SubmitHandler<Name> = async (data) => {
    const response = await nameMutate(data as Name);

    if (response.status >= 400) {
      const errorMessage = (await response.json())[0].message;
      alert(errorMessage);
    }

    nameSetValue("fullName", "");
    nameSetValue("description", "");
    refetch();
  };

  const namesOptions = names?.map((name) => ({
    value: name.id,
    label: name.fullName,
  }));

  return (
    <div className="flex justify-around">
      <div className=" w-5/12 m-5">
        <h1 className="text-2xl text-amber-400">Movie creation</h1>
        <div className="flex flex-col items-center rounded-lg mt-3 bg-amber-400 p-5 ">
          <form
            className="flex flex-col "
            onSubmit={movieHandleSubmit(movieOnSubmit)}
          >
            <label>Movie title</label>
            <input
              className="rounded p-1 w-2/4"
              type="text"
              placeholder="Movie title"
              {...movieRegister("title", {
                required: "this field is required",
              })}
            />
            {movieErrors.title?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            <label>Release Date</label>
            <input
              className="rounded p-1 w-2/4"
              type="date"
              {...movieRegister("releaseDate", {
                required: "this is required",
              })}
            />
            {movieErrors.releaseDate?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            <label>Storyline</label>
            <textarea
              className="p-1 rounded w-3/4"
              placeholder="Story here...."
              rows={6}
              cols={70}
              {...movieRegister("description", {
                required: "this is required",
                maxLength: 2000,
              })}
            ></textarea>
            {movieErrors.description?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            {movieErrors.description?.type === "maxLength" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                it contains more than 2000 char.
              </p>
            )}
            {typeof watchMovieDescription === "number" &&
              watchMovieDescription > 1750 && (
                <p className="text-red-600 mb-1 italic">
                  storyline can be store 2000 char you already writte
                  {watchMovieDescription}
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
            {movieErrors.actors?.type === "required" && (
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
            {movieErrors.directors?.type === "required" && (
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
            {movieErrors.writers?.type === "required" && (
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
            {movieErrors.composers?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            <div>
              <button
                className="bg-slate-900 text-white p-2 mt-3 rounded-md"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-5/12 m-5">
        <h1 className="text-2xl text-white">Name creation</h1>
        <div className="flex flex-col items-center rounded-lg mt-3 bg-white p-5">
          <form
            className="flex flex-col"
            onSubmit={nameHandleSubmit(nameOnSubmit)}
          >
            <label>Name</label>
            <input
              type="text"
              className="rounded p-1 w-2/4 border-2 border-black"
              {...nameRegister("fullName", { required: "it is required" })}
            />
            {nameErrors.fullName?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            <label>Description</label>
            <textarea
              className="p-1 rounded w-3/4 border-2 border-black"
              placeholder="Description here...."
              rows={6}
              cols={70}
              {...nameRegister("description", {
                required: "it is required",
                maxLength: 2000,
              })}
            ></textarea>
            {nameErrors.description?.type === "required" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                field is required
              </p>
            )}
            {nameErrors.description?.type === "maxLength" && (
              <p className="text-red-600 mb-1 italic" role="alert">
                it contains more than 2000 char.
              </p>
            )}
            {typeof watchNameDescription === "number" &&
              watchNameDescription > 1750 && (
                <p className="text-red-600 mb-1 italic">
                  description can be store 2000 char you already writte
                  {watchNameDescription}
                </p>
              )}
            <div>
              <button
                className="bg-amber-400 text-black p-2 mt-3 rounded-md"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
