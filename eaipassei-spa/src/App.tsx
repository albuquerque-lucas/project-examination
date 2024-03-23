import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Examinations from './pages/admin/Examinations';
import Login from './pages/admin/Login';
import Notices from './pages/admin/Notices';
import AdminLayout from './layouts/admin.layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from './pages/admin/Home';
import LayoutProvider from './context/Layout/LayoutProvider';
import AuthProvider from './context/Authentication/AuthContext';
import Router from './Router';

function App() {
  return (
    <>
      <AuthProvider>
        <LayoutProvider>
            <Router />
          <ToastContainer />
        </LayoutProvider>
    </AuthProvider>
    </>
  );
}

export default App;
