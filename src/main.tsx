import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Tools } from './pages/Tools';
import { Vault } from './pages/Vault';
import { KeyGenerator } from './pages/KeyGenerator';
import { NotFound } from './pages/NotFound';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Tools />,
    errorElement: <NotFound />,
  },
  {
    path: '/vault',
    element: <Vault />,
  },
  {
    path: '/key',
    element: <KeyGenerator />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);