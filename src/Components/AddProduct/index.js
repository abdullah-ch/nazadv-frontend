import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../Services/category';
import { setCategories } from '../../Store/Slices/categorySlice';
import { AddOrUpdateProductModal } from '../Common/AddOrUpdateProductModal';
import SpinnerButton from '../Common/Button';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);

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

  function openAddProductModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div>
        <SpinnerButton
          handleClick={openAddProductModal}
          label={'Add a Product'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
      <AddOrUpdateProductModal
        closeModal={closeModal}
        openModal={openAddProductModal}
        isEditMode={false}
        modalIsOpen={modalIsOpen}
      />
    </>
  );
};

export default AddProduct;
