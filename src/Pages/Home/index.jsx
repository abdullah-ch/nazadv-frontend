import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpinnerButton from "../../Components/Button";
import { getCurrentUser, selectUser } from "../../Store/Slices/userSlice";

export const Home = () => {
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
    <div className="flex justify-center items-center flex-col w-full gap-3">
      {userInfo ? (
        <div className="flex justify-center items-center flex-col">
          <h1>Name: {userInfo?.name}</h1>
          <h1>Email: {userInfo?.email}</h1>
          <h1> Joining Date: {userInfo?.joiningDate}</h1>
        </div>
      ) : null}

      <SpinnerButton
        // handleClick={}
        label={""}
        // isLoading={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  );
};
