import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectproductList,
  setProductList,
} from '../../../Store/Slices/productListSlice';
import { useAlert } from 'react-alert';
import { deleteProduct } from '../../../Services/product';
import { AddOrUpdateProductModal } from '../../Common/AddOrUpdateProductModal';

const ProductItem = ({ product }) => {
  const { name, categoryId: category, price, description, _id: id } = product;

  const [modalIsOpen, setIsOpen] = useState(false);

  const products = useSelector(selectproductList);
  const dispatch = useDispatch();
  const alert = useAlert();

  function openEditProductModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const editableData = {
    name,
    price,
    description,
    id,
    category: category._id,
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      const filteredProducts = products.filter((product) => product._id !== id);
      dispatch(setProductList(filteredProducts));
      alert.success('Product deleted Successfully');
    } catch (error) {
      error?.response?.data?.errors?.forEach((errObj) => {
        alert.error(errObj.message);
      });
    }
  };

  const handleEdit = () => {
    // Handle edit logic here
    openEditProductModal();
  };

  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-600 mb-2">Category: {category.name}</div>
      <div className="mb-2">Price: ${price}</div>
      <div className="mb-4">{description}</div>
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <AddOrUpdateProductModal
        closeModal={closeModal}
        openModal={openEditProductModal}
        modalIsOpen={modalIsOpen}
        editableData={editableData}
        isEditMode
      />
    </div>
  );
};

export default ProductItem;
