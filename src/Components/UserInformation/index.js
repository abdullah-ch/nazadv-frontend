import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectUser } from '../../Store/Slices/userSlice';
import { capitalizeFirstChar, formatDate } from './../../utils/index';
import { useTranslation } from 'react-i18next';

export const UserInformation = () => {
  const dispatch = useDispatch();
  const apiRef = useRef(true);
  const userInfo = useSelector(selectUser);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (apiRef.current) {
      dispatch(getCurrentUser());
      apiRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capitalizeTranslatedString = (key) => {
    const translatedString = t(key);
    return capitalizeFirstChar(translatedString);
  };

  return (
    <>
      {userInfo ? (
        <div className="flex justify-center items-center flex-col">
          <h1>
            {capitalizeTranslatedString('word.name')}: {userInfo?.name}
          </h1>
          <h1>
            {capitalizeTranslatedString('word.email')}: {userInfo?.email}
          </h1>
          <h1>
            {capitalizeTranslatedString('word.joiningDate')}:
            {formatDate(userInfo?.joiningDate)}
          </h1>
        </div>
      ) : null}
    </>
  );
};
