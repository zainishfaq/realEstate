import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import SignInImage from "../assets/SignIn.jpg";

function SignIn() {
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(signInStart());
      const response = await axios.post(`http://localhost:3000/SignIn`, values);
      console.log("SignIn Successfully", response.data);
      dispatch(signInSuccess(response.data));
      navigate("/Profile");
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg">
        <div
          className="md:w-1/2 bg-cover bg-center h-80%"
          style={{ backgroundImage: `url(${SignInImage})` }}
        ></div>

        <div className="md:w-1/2 bg-gray-200 flex flex-col justify-center p-6 md:p-12">
          <h1 className="text-3xl mb-7 ml-36">Sign In</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-auto max-w-md flex flex-col gap-5">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="border rounded-lg py-2 px-3"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />

                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="border rounded-lg py-2 px-3"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />

                <button
                  disabled={isSubmitting || loading}
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                  {isSubmitting || loading ? "Loading..." : "Sign In"}
                </button>

                {error && <p className="text-red-500">{error}</p>}
                <OAuth />
              </Form>
            )}
          </Formik>

          <div className="text-center mt-10">
            <p>
              Don't have an account?{" "}
              <NavLink to="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
