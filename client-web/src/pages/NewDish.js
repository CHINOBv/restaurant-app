import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { FirebaseContext } from "../firebase";

import FileUploader from "react-firebase-file-uploader";

const NewDish = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgUri, setImgUri] = useState("");

  const { firebase } = useContext(FirebaseContext);

  const navigate = useHistory();

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
      image: Yup.string(),
      description: Yup.string()
        .min(10, "The description is too short")
        .required("Description Is Required"),
    }),
    onSubmit: (dish) => {
      try {
        dish.ecxistance = true;
        dish.image = imgUri;
        firebase.db.collection("products").add(dish);
        navigate.push("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleUploadError = (error) => {
    setUploading(false);
    console.log(error);
  };

  const handleUploadSuccess = async (name) => {
    setProgress(100);
    setUploading(false);
    const url = await firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL();
    setImgUri(url);
  };

  const handleUploadProgress = (progressUpload) => {
    setProgress(progressUpload);
  };

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
              <FileUploader
                accept="image/*"
                id="image"
                randomizeFilename
                name="image"
                storageRef={firebase.storage.ref("products")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleUploadProgress}
              />
            </div>
            {uploading ? (
              <div className="h-12 relative w-full border">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progress}%` }}
                >
                  {progress} %
                </div>
              </div>
            ) : null}
            {imgUri ? (
              <p className="font-bold text-center bg-green-500 text-white p-3 my-5">
                Image Is Uploaded
              </p>
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
              {formik.touched.description && formik.errors.description ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                  role="alert"
                >
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.description}</p>
                </div>
              ) : null}
            </div>
            <input
              type="submit"
              value="Add New Dish"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold "
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDish;
