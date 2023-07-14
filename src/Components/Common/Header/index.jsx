import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../Services/auth';
import { persistor } from '../../../Store/store.js';
import { useAlert } from 'react-alert';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const handleHome = () => {
    navigate('/');
  };

  const handlelogOut = async () => {
    try {
      await logOut();
      localStorage.clear();
      await persistor.purge();
      navigate('/login');
    } catch (error) {
      error?.response?.data?.errors.forEach((errObj) => {
        alert.error(errObj.message);
      });
    }
  };

  return (
    <header className="flex  items-center justify-between m-2 bg-yellow-200 flex-row">
      <div className="flex items-center justify-between w-full ">
        <div>
          <span onClick={handleHome} className="cursor-pointer mr-4">
            Dashboard
          </span>
          <LanguageSwitcher
            classStyles="ml-3 cursor-pointer"
            openOnMounting={false}
            showButton
          />
        </div>
        <button onClick={handlelogOut} className="ml-3">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
