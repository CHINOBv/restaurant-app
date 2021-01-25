import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import Dish from "../components/menu/Dish";
import { FirebaseContext } from "../firebase";

const Menu = () => {
  const [dishs, setDishs] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  const handleSnapshot = (snapshot) => {
    const dish = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishs(dish);
  };

  useEffect(() => {
    const getDish = () =>
      firebase.db.collection("products").onSnapshot(handleSnapshot);
    getDish();
  }, [firebase]);

  return (
    <>
      <h1 className="text-3xl font-light text-center my-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white font-bold"
      >
        Add New Dish
      </Link>
      {dishs.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Menu;
