import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppFrame from './layouts/AppFrame';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppFrame />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
