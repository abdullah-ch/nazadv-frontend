import React from 'react';

import { UserInformation } from '../../Components/UserInformation';
import AddProduct from '../../Components/AddProduct';

export const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full gap-3">
      <UserInformation />
      <AddProduct />
    </div>
  );
};
