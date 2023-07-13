import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectUser } from '../../Store/Slices/userSlice';
import { formatDate } from './../../utils/index';

export const UserInformation = () => {
  const dispatch = useDispatch();
  const apiRef = useRef(true);
  const userInfo = useSelector(selectUser);

  useEffect(() => {
    if (apiRef.current) {
      dispatch(getCurrentUser());
      apiRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userInfo ? (
        <div className="flex justify-center items-center flex-col">
          <h1>Name: {userInfo?.name}</h1>
          <h1>Email: {userInfo?.email}</h1>
          <h1> Joining Date: {formatDate(userInfo?.joiningDate)}</h1>
        </div>
      ) : null}
    </>
  );
};
