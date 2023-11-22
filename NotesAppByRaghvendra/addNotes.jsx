// import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import httpService from "../services/httpService";
function AddNotes(props) {
  const { notes } = props;
  const { index, mode } = props.match.params;
  // console.log(index, mode);
  const note = notes[index] || {};
  const setValidationSchema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup
      .string()
      .required("Description is Required")
      .min(10, "Password must be greater than 6 characters"),
  });
  const handleNotes = async (values) => {
    // console.log("Handle Notes:", values);
    try {
      let response = await httpService.post("/myNotes", values);
      // console.log("Response data:", response.data);
      alert(response.data);
      window.location = "/myNotes";
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const handleEdit = async (values) => {
    // console.log("Handle Edit:", values);
    try {
      let response = await httpService.put(`/myNotes/${index}`, values);
      // console.log("Response data:", response.data);
      alert(response.data);
      window.location = "/myNotes";
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="container bg-light border p-4 my-4 rounded-5">
      <Formik
        initialValues={{
          title: note.title || "",
          description: note.description || "",
        }}
        validationSchema={setValidationSchema}
        onSubmit={(values) => {
          if (mode === "Edit") {
            handleEdit(values);
          } else {
            handleNotes(values);
          }
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Title</label>
              <Field name="title" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="title" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <Field
                as="textarea"
                name="description"
                type="text"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="description" />
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary m-2">
                {mode === "Edit" ? "EDIT" : "ADD"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddNotes;
