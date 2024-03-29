import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

const RecipeItem = () => {
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(id);

  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) {
      return duration + "h";
    }

    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splitterMinutes = "." + splittedDuration[1];
      const minutes = +splitterMinutes * 60 + "min";

      return hour + minutes;
    }
  };

  return (
    <div className="recipe-item-section container mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 ">
      <div className="left row-start-2 lg:row-start-auto">
        <div className="img overflow-hidden rounded-xl border shadow-md group">
          <img
            src={recipe?.image_url}
            alt={recipe?.title}
            className="h-full w-full object-center group-hover:scale-105 duration-300"
          />
        </div>
        <div className="ings mt-10">
          <span className="ing-title text-3xl font-medium mb-5 inline-block">
            Ingredients
          </span>
          <ul className="flex flex-col gap-2">
            {recipe?.ingredients?.map((ing, i) => (
              <li key={i}>
                {ing.quantity} {ing.unit} {ing.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right flex flex-col gap-5">
        <span className="publisher uppercase tracking-widest font-semibold text-sky-400">
          {recipe?.publisher}
        </span>
        <h2 className="title text-5xl">{recipe?.title}</h2>
        <div className="servings-cooking-time flex gap-5 uppercase tracking-widest font-semibold text-rose-500">
          <div className="servings">Servings: {recipe?.servings} people</div>
          <div className="cookings-time">
            {recipe?.cooking_time < 60
              ? String(recipe?.cooking_time) + "min"
              : durationCalc(recipe?.cooking_time / 60)}
          </div>
        </div>
        <div className="btns flex gap-5">
          <button className=" bg-gradient-to-br from-sky-400 to-sky-600 text-sky-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 duration-300">
            + Save as favourite
          </button>
          <a
            href={recipe?.source_url}
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-rose-50 p-3 px-8 rounded-lg textsm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-300 hover:shadow-lg hover:shadow-rose-300 duration-300"
          >
            Get directions
          </a>
          <Link
            to="/"
            className=" bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
