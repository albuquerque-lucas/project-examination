import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/"/>
        <Route path="/admin/login"/>
        <Route path="/admin/examinations"/>
        <Route path="dashboard"/>
      </Routes>
    </>
  );
}

export default App;
