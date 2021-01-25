import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <h1 className="text-3xl font-light text-center my-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white font-bold"
      >
        Add New Dish
      </Link>
    </>
  );
};

export default Menu;
