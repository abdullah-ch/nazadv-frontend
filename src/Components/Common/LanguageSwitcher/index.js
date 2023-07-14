/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import styles from './index.module.css';

const LanguageSwitcher = ({
  openOnMounting = true,
  showButton = false,
  classStyles = '',
}) => {
  const { i18n } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    closeModal();
  };

  useEffect(() => {
    if (openOnMounting) {
      openModal();
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <span className={classStyles}>
      {showButton ? <span onClick={openModal}>Switch Language</span> : null}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Language Modal"
        ariaHideApp={false}
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
        <h2 className="text-2xl mb-4">Select Language</h2>
        <div className="justify-center flex flex-col">
          <button
            className="mb-2 hover:bg-blue-500 hover:text-white hover:border-transparent border border-blue-500 text-blue-500 rounded px-4 py-2 transition-colors duration-300"
            onClick={() => changeLanguage('ar')}
          >
            Arabic
          </button>
          <div className="mb-2"></div>
          <button
            className="hover:bg-blue-500 hover:text-white hover:border-transparent border border-blue-500 text-blue-500 rounded px-4 py-2 transition-colors duration-300"
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
        </div>
      </Modal>
    </span>
  );
};

export default LanguageSwitcher;
