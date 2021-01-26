import { useContext, useRef } from "react";
import { FirebaseContext } from "../../firebase";

const Dish = ({ dish }) => {
  const { id, name, image, existance, category, description, price } = dish;

  const { firebase } = useContext(FirebaseContext);
  const existanceRef = useRef(existance);

  const changeAvialable = () => {
    const onExistance = existanceRef.current.value === "true";

    try {
      firebase.db.collection("products").doc(id).update({
        existance: onExistance,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12 pr-5">
            <img src={image} alt={name} />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-3 sm:w-2/4" htmlFor="existance">
                <span className="block text-gray-800 mb-2">Existance</span>
                <select
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-none"
                  id="existance"
                  value={existance}
                  ref={existanceRef}
                  onChange={() => changeAvialable()}
                >
                  <option value="true">Avialable</option>
                  <option value="false">Unavialable</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
            <p className="text-gray-600 mb-4">
              Category:{" "}
              <span className="text-gray-700 font-bold uppercase">
                {category}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
              Price: <span className="text-gray-700 font-bold ">${price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
