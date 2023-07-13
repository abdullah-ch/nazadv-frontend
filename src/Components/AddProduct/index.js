import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerButton from '../Common/Button';
import { useAlert } from 'react-alert';
import Modal from 'react-modal';
import { getCategories } from '../../Services/category';
import {
  selectCategories,
  setCategories,
} from '../../Store/Slices/categorySlice';
import { addProductSchema } from '../../Validations';
import { createProduct } from '../../Services/product';
import styles from './index.module.css';
import {
  selectproductList,
  setProductList,
} from '../../Store/Slices/productListSlice';
const initialValues = {
  name: '',
  description: '',
  price: '',
  category: '',
};
const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectproductList);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        data: { data: categoriesData },
      } = await getCategories();
      dispatch(setCategories(categoriesData));
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (values) => {
    try {
      const { category, ...rest } = values;
      setLoading(true);
      const payload = {
        ...rest,
        categoryId: category,
      };
      const {
        data: { data: newlyAddedProduct },
      } = await createProduct(payload);
      const productListSnapShot = structuredClone(products ?? []);
      productListSnapShot.unshift(newlyAddedProduct);
      dispatch(setProductList(productListSnapShot));
      closeModal();
      alert.success('Product Added Successfully !!');
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
      <div>
        <SpinnerButton
          handleClick={openModal}
          label={'Add a Product'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Add Product Modal"
        className={`${styles.modal}`}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h1 className="m-2">Add a Product</h1>
        <Formik
          validationSchema={addProductSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            addProduct(values, setSubmitting);
          }}
        >
          {(formikProps) => {
            let { values, handleChange, handleBlur } = formikProps;

            return (
              <Form className="flex justify-center items-center flex-col w-full  gap-3">
                <Field
                  type="text"
                  name="name"
                  className="border rounded-md border-solid border-black p-1"
                  placeholder="name"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-500 text-sm mt-2"
                />

                <Field
                  type="text"
                  name="price"
                  className="border rounded-md border-solid border-black p-1"
                  placeholder="price"
                />
                <ErrorMessage
                  name="price"
                  component="span"
                  className="text-red-500 text-sm mt-2"
                />

                <Field
                  as="textarea"
                  name="description"
                  className="border rounded-md border-solid border-black p-1 h-32"
                  placeholder="description"
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-red-500 text-sm mt-2"
                />

                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border rounded-md border-solid border-black p-1"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <ErrorMessage
                  name="category"
                  component="span"
                  className="text-red-500 text-sm mt-2"
                />

                <SpinnerButton
                  type="submit"
                  label={'Submit'}
                  isLoading={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProduct;
