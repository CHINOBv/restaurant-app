import { useContext } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { FirebaseContext } from "../firebase";

const NewDish = () => {
  const { firebase } = useContext(FirebaseContext);

  console.log(firebase);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "The name is too short")
        .required("Name Is Required"),
      price: Yup.number()
        .min(1, "The price is too short")
        .required("Price Is Required"),
      category: Yup.string().required("Category Is Required"),
      image: Yup.string().required("Image Is Required"),
      description: Yup.string()
        .min(10, "The description is too short")
        .required("Description Is Required"),
    }),
    onSubmit: (data) => console.log(data),
  });

  return (
    <>
      <h1 className="text-3xl font-light text-center my-4">Add New Dish</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="text-gray-700 block text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="text"
                id="name"
                placeholder="Name Of Dish"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error: </p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="text-gray-700 block text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="number"
                id="price"
                placeholder="$20"
                min="0"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error: </p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="text-gray-700 block text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none bg-white"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">--Select You Categorie</option>
                <option value="breakfast">Breakfast</option>
                <option value="food">Food</option>
                <option value="dinner">Dinner</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error: </p>
                <p>{formik.errors.category}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="text-gray-700 block text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="file"
                id="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.image && formik.errors.image ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error: </p>
                <p>{formik.errors.image}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="text-gray-700 block text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                id="description"
                placeholder="Description Of Dish"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <input
                type="submit"
                value="Add New Dish"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold "
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error: </p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDish;
