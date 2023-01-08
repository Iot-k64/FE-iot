import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppFrame from './layouts/AppFrame';

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}
