import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import ClipLoader from 'react-spinners/ClipLoader';

import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.css';
import { getProducts } from '../../Services/product';
import {
  selectproductList,
  setProductList,
} from '../../Store/Slices/productListSlice';
import ProductItem from './ProductItem';

const ProductListSection = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const products = useSelector(selectproductList);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const {
          data: { data: productList },
        } = await getProducts();
        dispatch(setProductList(productList));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      {loading ? (
        <ClipLoader size={40} color={'#000BDB'} loading={loading} />
      ) : products?.length ? (
        <>
          {products.map((product, i) => {
            return (
              <div key={i}>
                <ProductItem product={product} />
              </div>
            );
          })}
        </>
      ) : (
        'You do not have any products, Please add some'
      )}
    </section>
  );
};

export default ProductListSection;
