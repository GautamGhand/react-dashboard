import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './Loader';
import ConditionalLayout from './ConditionalLayout';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('./Home'));
const UserCreate = lazy(() => import('./UserCreate'));
const Login = lazy(() => import('./Login'));
const UserEdit = lazy(() => import('./UserEdit'));
const UserListing = lazy(() => import('./UserListing'));
const Products = lazy(() => import('./Products'));
const NotFound = lazy(() => import('./NotFound'));

const MainRouter = () => {
  return (
    <ConditionalLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute element={<UserListing />} />}
          />
          <Route
            path="/users/create"
            element={<PrivateRoute element={<UserCreate />} />}
          />
          <Route
            path="/users/edit/:uuid"
            element={<PrivateRoute element={<UserEdit />} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<Products />} />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Suspense>
    </ConditionalLayout>
  );
};

export default MainRouter;
