// ContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../store/userSlice';
import summaryApi from './../common';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
        setUser(data.data);
      }

      console.log("dataapi-data", data.data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(summaryApi.addToCartProductCount.url, {
        method: summaryApi.addToCartProductCount.method,
        credentials: 'include',
      });
      const data = await response.json();
      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error("Failed to fetch cart product count", error);
    }
  };

  const removeCart = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserDetails();
      await fetchUserAddToCart();
    };

    fetchData();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails, fetchUserAddToCart, cartProductCount, user, removeCart }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
