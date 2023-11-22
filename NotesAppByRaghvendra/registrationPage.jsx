import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import httpService from "../services/httpService";
function RegistrationPage(props) {
  const [img, setImg] = useState(null);
  const inputRef = useRef(null);
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const personValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is Required")
      .email("Enter a valid email address"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must be greater than 6 characters"),
    passwordConfirmation: yup
      .string()
      .required("Password is Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const handleImg = (e) => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(URL.createObjectURL(file));
    setImg(file);
  };

  const handleRegister = async (values) => {
    // console.log("Handle Register values:", values);
    try {
      let response = await httpService.post("/register", values);
      // console.log("Response data:", response.data);
      alert(response.data);
      props.history.push("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="container bg-light col-lg-4 col-sm-12 border p-4 my-4 rounded-5">
      <Formik
        initialValues={{
          email: "",
          img: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={personValidationSchema}
        onSubmit={(values) => {
          // values.img = img;
          handleRegister(values);
          // authPassportService.removeToken();
        }}
      >
        {() => (
          <Form>
            <div className="text-center">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                width={"100px"}
                height={"100px"}
                style={{ cursor: "pointer", borderRadius: "100%" }}
                onClick={handleImg}
              />
              <br />
              <input
                type="file"
                value={""}
                onChange={handleImageChange}
                ref={inputRef}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <Field name="email" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="form-group">
              <label>Comfirm Password</label>
              <Field
                name="passwordConfirmation"
                type="password"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="passwordConfirmation" />
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary m-2">
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default RegistrationPage;
