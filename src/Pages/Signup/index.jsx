import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../Services/auth";
import { useAlert } from "react-alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import SpinnerButton from "../../Components/Common/Button";
import useValidations from "../../useValidations";

const initialValues = {
  email: "",
  password: "",
  name: "",
};

export const Signup = () => {
  const { t } = useTranslation("common");
  const { SignUpSchema } = useValidations();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const routeToLogin = () => {
    navigate("/login");
  };

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
            placeholder={t(`word.name`)}
          />
          <ErrorMessage name="name" component="span" className="error" />

          <Field
            type="text"
            name="email"
            className="border rounded-md border-solid border-black p-1"
            placeholder={t(`word.email`)}
          />
          <ErrorMessage name="email" component="span" className="error" />

          <Field
            type="password"
            name="password"
            className="border rounded-md border-solid border-black p-1"
            placeholder={t(`word.password`)}
          />
          <ErrorMessage name="password" component="span" className="error" />

          <SpinnerButton
            type="submit"
            label={t(`word.Submit`)}
            isLoading={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
          <div>
            {t(`account.alreadyHaveAccount`)}
            <span onClick={routeToLogin} className="text-blue-600">
              {t(`account.loginHere`)}
            </span>
          </div>
        </Form>
      </Formik>
    </>
  );
};
