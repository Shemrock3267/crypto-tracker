import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '../containers/App';
import DashboardPage from '../pages/DashboardPage';
import WalletPage from '../pages/WalletPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<DashboardPage />} />
      <Route path='/wallet' element={<WalletPage />} />
    </Route>
  )
);

export default router;
