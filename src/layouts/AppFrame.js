import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '../pages/Container/Container';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import AdminLayout from './AdminLayout';

export default function AppFrame() {
  const isLogin = localStorage.getItem('isLogin');
  if (isLogin === null) {
    localStorage.setItem('isLogin', false);
  }
  console.log(isLogin);
  return (
    <Routes>
      {!isLogin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route path="container" element={<Container />} />
          <Route path="product" element={<Product />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}
