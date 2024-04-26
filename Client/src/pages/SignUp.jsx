import React from "react";
import SignupImage from "../assets/Signup.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUp() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const response = await axios.post(`http://localhost:3000/SignUp`, values);
      console.log("SignUp Successfully", response.data);
      resetForm();
      navigate("/sign-in");
    } catch (error) {
      console.error("Error Signing Up Try again later", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg r">
        <div
          className="md:w-1/2 bg-cover bg-center h-80%"
          style={{ backgroundImage: `url(${SignupImage})` }}
        ></div>

        <div className="md:w-1/2 bg-gray-200 flex flex-col justify-center p-6 md:p-12">
          <h1 className="text-3xl ml-36  mb-7 text-black">Sign Up</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-auto max-w-md flex flex-col gap-5">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Name"
                  className="border rounded-lg py-2 px-3"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500"
                />
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
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                  {isSubmitting ? "Loading..." : "Sign Up"}
                </button>
                <OAuth />
              </Form>
            )}
          </Formik>
          <div className="text-center mt-10">
            <p>
              Do you have an account?{" "}
              <NavLink to="/sign-in" className="text-black hover:underline">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
