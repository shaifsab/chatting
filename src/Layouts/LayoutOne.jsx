import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { useSelector } from 'react-redux';

const LayoutOne = () => {
  const userData = useSelector((state) => state.counter.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  return (
    <>
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutOne;
