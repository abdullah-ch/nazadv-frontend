import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { logInUser } from '../../Services/auth';
import { setLogIn } from '../../Store/Slices/userSlice';
import { useAlert } from 'react-alert';
import SpinnerButton from '../../Components/Button';
import { LoginSchema } from '../../Validations';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

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
          label={'Submit'}
          isLoading={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />

        <div>
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600">
            Sign Up Here!
          </a>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
