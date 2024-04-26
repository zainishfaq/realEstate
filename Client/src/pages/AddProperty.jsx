import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function AddProperty() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
    imageUrls: [],
  };

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .required("Name is required")
  //     .min(5, "Name must be at least 5 characters")
  //     .max(20, "Name must be at most 20 characters"),
  //   description: Yup.string()
  //     .required("Description is required")
  //     .min(10, "Description must be at least 10 characters")
  //     .max(100, "Description must be at most 100 characters"),
  //   address: Yup.string()
  //     .required("Address is required")
  //     .min(10, "Address must be at least 10 characters")
  //     .max(100, "Address must be at most 100 characters"),
  // });

  const [formData, setFormData] = useState(initialValues);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length === 0) {
      setImageUploadError("Please select at least one image.");
      return;
    }

    if (files.length + formData.imageUrls.length >= 7) {
      setImageUploadError("You can upload a maximum of 6 images per listing.");
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      })
      .catch((error) => {
        setImageUploadError("Image Upload Failed max(3mb)");
        setUploading(false);
      });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/list", {
        ...formData,
        userRef: currentUser.user.id, 
      });

      setLoading(false);

      if (response.data.success === false) {
        console.error("Error creating listing:", response.data.message);
        console.log(response.data);
      } else {
        console.log("Listing created:", response.data);
        // Navigate to the newly created listing
        navigate(`/listing/${response.data.id}`);
      }   
    } catch (error) {
      console.error("Error creating listing:", error.message);
      
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto bg-gray-200 rounded-lg my-4">
      <h1 className="text-4xl, text-center font-semibold my-8">
        Add Property Details
      </h1>
      <Formik
        initialValues={formData}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
                
            {/* <div style={{ height: "400px", width: "100%" }}>
                <LoadScript googleMapsApiKey="AIzaSyDkiEddyfclww6uvxMK0zLOC2jBmpY_-i0">
                  <GoogleMap
                    center={{ lat: 30.3753, lng: 69.3451 }} 
                    zoom={5} 
                  >
                    <Marker position={{ lat: 30.3753, lng: 69.3451 }} />
                  </GoogleMap>
                </LoadScript>
              </div> */}



              <Field
                type="text"
                placeholder="Name"
                className="border p-3 rounded-lg"
                name="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-700 text-sm"
              />

              <Field
                as="textarea"
                placeholder="Description"
                className="border p-3 rounded-lg"
                name="description"
                id="description"
                onChange={handleChange}
                value={formData.description}
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-700 text-sm"
              />

              <Field
                type="text"
                placeholder="address"
                className="border p-3 rounded-lg"
                name="address"
                id="address"
                onChange={handleChange}
                value={formData.address}
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-700 text-sm"
              />

              <div className="flex gap-5 flex-wrap">
                <div className="flex gap-2">
                  <Field
                    type="checkbox"
                    id="sale"
                    name="sale"
                    className="checkbox w-5"
                    onChange={handleChange}
                    checked={formData.type === "sale"}
                  />
                  <label htmlFor="sale">Sell</label>
                </div>

                <div className="flex gap-2">
                  <Field
                    type="checkbox"
                    id="rent"
                    name="rent"
                    className="checkbox w-5"
                    onChange={handleChange}
                    checked={formData.type === "rent"}
                  />
                  <label htmlFor="rent">Rent</label>
                </div>

                <div className="flex gap-2">
                  <Field
                    type="checkbox"
                    id="parking"
                    name="parking"
                    className="checkbox w-5"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <label htmlFor="parking">Parking Spot</label>
                </div>

                <div className="flex gap-2">
                  <Field
                    type="checkbox"
                    id="furnished"
                    name="furnished"
                    className="checkbox w-5"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <label htmlFor="furnished">Furnished</label>
                </div>

                <div className="flex gap-2">
                  <Field
                    type="checkbox"
                    id="offer"
                    name="offer"
                    className="checkbox w-5"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <label htmlFor="offer">Offer</label>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Field
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    min="1"
                    max="10"
                    placeholder="Beds"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <label htmlFor="bedrooms">Beds</label>
                </div>

                <div className="flex items-center gap-3">
                  <Field
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    min="1"
                    max="10"
                    placeholder="Baths"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <label htmlFor="bathrooms">Baths</label>
                </div>

                <div className="flex items-center gap-3">
                  <Field
                    type="number"
                    id="regularPrice"
                    name="regularPrice"
                    min="50"
                    max="10000000"
                    placeholder="Regular Price"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex flex-col items-center">
                    <label htmlFor="regularPrice">Regular Price</label>
                    <span className="text-xs">($ /month)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Field
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                    min="50"
                    max="10000000"
                    placeholder="Discount Price"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <label htmlFor="diacountPrice">Discount Price</label>
                    <span className="text-xs">($ /month)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-4 ">
              <p className=" font-semibold">
                Images:{"  "}
                <span className="font-normal">You can upload max 6 Images</span>
              </p>

              <div className="flex gap-4">
                <Field
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="p-3 border border-gray-300 rounded w-full"
                  onChange={(e) => setFiles(e.target.files)}
                />
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  className="p-3 bg-blue-600 rounded-lg uppercase hover:bg-yellow-500 text-white "
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-600 text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 items-center"
                  >
                    <img
                      src={url}
                      alt="Listing Image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 bg-red-500 text-white hover:bg-gray-600 rounded-lg uppercase"
                    >
                      Delete
                    </button>
                  </div>
                ))}

              <button
                type="submit"
                className="p-3 bg-black text-white rounded-lg uppercase hover:bg-slate-700"
              >
                Add Property
              </button>
             
            </div>
          </Form>
        
        )}
      </Formik>
    </main>
  );
}

export default AddProperty;
