import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { logInUser } from '../../Services/auth';
import { setLogIn } from '../../Store/Slices/userSlice';
import { useAlert } from 'react-alert';
import SpinnerButton from '../../Components/Common/Button';
import useValidations from '../../useValidations';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../Components/Common/LanguageSwitcher';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginSchema } = useValidations();
  const { t } = useTranslation('common');

  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const routeToSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      // Make the login request using the logInUser function
      const { data } = await logInUser(values);

      // Set access token and dispatch the login action
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(setLogIn(true));

      navigate('/');
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
      <LanguageSwitcher />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form className="flex justify-center items-center flex-col w-full h-screen gap-3">
          <Field
            type="text"
            name="email"
            className="border rounded-md border-solid border-black p-1"
            placeholder={t(`word.email`)}
          />
          <ErrorMessage
            name="email"
            component="span"
            className="text-red-500 text-sm mt-2"
          />

          <Field
            type="password"
            name="password"
            className="border rounded-md border-solid border-black p-1"
            placeholder={t(`word.password`)}
          />
          <ErrorMessage
            name="password"
            component="span"
            className="text-red-500 text-sm mt-2"
          />

          <SpinnerButton
            type="submit"
            label={t(`word.Submit`)}
            isLoading={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />

          <div onClick={routeToSignUp}>
            {t(`account.noAccount`)}
            <span className="text-blue-600">{t(`account.signUpHere`)}</span>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
