import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../Services/auth";
import { useAlert } from "react-alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SpinnerButton from "../../Components/Button";
import { SignUpSchema } from "../../Validations";
import { useTranslation } from "react-i18next";

const initialValues = {
  email: "",
  password: "",
  name: "",
};

export const Signup = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleSignUp = async (values) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        joiningDate: new Date(),
      };
      setLoading(true);
      await signUpUser(payload);

      navigate("/login");
    } catch (err) {
      err?.response?.data?.errors?.forEach((errObj) => {
        alert.error(errObj.message);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        <Form className="flex justify-center items-center flex-col w-full h-screen gap-3">
          <Field
            type="text"
            name="name"
            className="border rounded-md border-solid border-black p-1"
            placeholder="name"
          />
          <ErrorMessage name="name" component="span" className="error" />

          <Field
            type="text"
            name="email"
            className="border rounded-md border-solid border-black p-1"
            placeholder="email"
          />
          <ErrorMessage name="email" component="span" className="error" />

          <Field
            type="password"
            name="password"
            className="border rounded-md border-solid border-black p-1"
            placeholder="password"
          />
          <ErrorMessage name="password" component="span" className="error" />

          <SpinnerButton
            type="submit"
            label={"Submit"}
            isLoading={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
          <div>
            {t(`account.alreadyHaveAccount`)}
            <a href="/login" className="text-blue-600">
              {t(`account.loginHere`)}
            </a>
          </div>
        </Form>
      </Formik>
    </>
  );
};
