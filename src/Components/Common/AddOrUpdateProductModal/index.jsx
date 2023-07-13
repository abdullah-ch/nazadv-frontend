import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { selectCategories } from '../../../Store/Slices/categorySlice';
import {
  selectproductList,
  setProductList,
} from '../../../Store/Slices/productListSlice';
import {
  createProduct,
  getProducts,
  updateProduct,
} from '../../../Services/product';
import SpinnerButton from '../Button';
import styles from './index.module.css';
import { addProductSchema } from '../../../Validations';

export const AddOrUpdateProductModal = ({
  isEditMode = false,
  editableData = {},
  modalIsOpen,
  openModal,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectproductList);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const initialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
  };

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

  const editProduct = async (values) => {
    try {
      const { category, ...rest } = values;
      setLoading(true);
      const payload = {
        ...rest,
        categoryId: category,
      };
      await updateProduct(payload);

      const {
        data: { data: productList },
      } = await getProducts();

      dispatch(setProductList(productList));

      closeModal();
      alert.success('Product Edited Successfully !!');
    } catch (err) {
      console.log('err ===<> ', err);
      err?.response?.data?.errors?.forEach((errObj) => {
        alert.error(errObj.message);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (values) => {
    if (isEditMode) {
      return editProduct(values);
    }
    addProduct(values);
  };

  return (
    <div>
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

        <h1 className="m-2">
          {isEditMode ? 'Edit a Product' : 'Add a Product'}
        </h1>
        <Formik
          validationSchema={addProductSchema}
          initialValues={isEditMode ? editableData : initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
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
    </div>
  );
};
