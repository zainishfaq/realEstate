import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(updateUserStart());
      const updatedValues = { ...values, ...formData };
      const res = await axios.put(
        `http://localhost:3000/update/${currentUser.user.id}`,
        updatedValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `http://localhost:3000/delete/${currentUser.user.id}`
      );
      if (res.data.success === false) {
        dispatch(deleteUserFailure(res.data.message));
        return;
      }
      dispatch(deleteUserSuccess(res.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await axios.post("http://localhost:3000/signout");

      if (res.data.success === false) {
        dispatch(signOutFailure(res.data.message));
        return;
      }

      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getlistall/${currentUser.user.id}`
      );
      console.log("Listings:", response.data);
      setListings(response.data);
      setShowListings(true);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <div className="p-3 max-w-md mt-16 mx-auto mb-12 border-x-2 border-y-2 border-black shadow-lg rounded-md bg-gray-300">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <Formik
        initialValues={{
          username: currentUser.user.username || "",
          email: currentUser.user.email || "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string().min(
            6,
            "Password must be at least 6 characters long"
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              src={
                currentUser.user.avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Avatar"
              onClick={() => fileRef.current.click()}
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
            <p className="text-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700 text-center">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700 text-center">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
            <Field
              type="text"
              placeholder="username"
              id="username"
              name="username"
              className="border p-3 rounded-lg"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500"
            />

            <Field
              type="email"
              placeholder="email"
              id="email"
              name="email"
              className="border p-3 rounded-lg"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />

            <Field
              type="password"
              placeholder="password"
              id="password"
              name="password"
              className="border p-3 rounded-lg"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />

            <button
              type="submit"
              className="bg-red-700 text-white rounded-lg p-3 uppercase hover:bg-gray-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col justify-between mt-5 gap-4 text-center">
        <NavLink
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/add-property"}
        >
          Add Property
        </NavLink>
      </div>

      <div className="flex flex-col justify-between mt-5 gap-4 text-center">
        <div
          className="bg-blue-700 text-white rounded-lg p-3 cursor-pointer hover:bg-gray-700 "
          onClick={handleDelete}
        >
          Delete account
        </div>
        <div
          className="bg-yellow-500 text-white rounded-lg p-3 cursor-pointer hover:bg-gray-700"
          onClick={handleSignOut}
        >
          Sign out
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-indigo-700 text-white rounded-lg p-3 cursor-pointer hover:bg-gray-700"
          onClick={fetchListings}
        >
          Show Listings
        </button>
      </div>

      {showListings && (
        <div className="mt-5">
          <h2 className="text-2xl font-semibold mb-3 text-center">Listings</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-gray-100 p-4 rounded-lg w-64">
                <p className="font-semibold">{listing.name}</p>
                <p>
                  {listing.address && (
                    <NavLink
                      to={`/listing/${listing.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {listing.address}
                    </NavLink>
                  )}
                </p>
                <img
                  src={listing.imageUrls[0]}
                  alt=""
                  className="w-full h-40 object-cover mt-2 mb-4 rounded-md"
                />
                <p className="font-semibold">{listing.regularPrice}$</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
