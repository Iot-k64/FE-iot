import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '../pages/Container/Container';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import AdminLayout from './AdminLayout';

export default function AppFrame() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/container" element={<Container />} />
        <Route path="/product" element={<Product />} />
      </Route>
    </Routes>
  );
}
