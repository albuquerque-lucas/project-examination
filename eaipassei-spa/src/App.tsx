import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login"/>
        <Route path="/admin/home"/>
        <Route path="/admin/manage/api/examinations"/>
        <Route path="/admin/manage/api/notices"/>
        <Route path="/admin/manage/api/exams"/>
        <Route path="/admin/manage/api/exam-questions"/>
        <Route path="/admin/manage/api/study-areas"/>
        <Route path="/admin/manage/api/subjects"/>
        <Route path="/admin/manage/api/users"/>
        <Route path="/admin/manage/api/account-plans"/>
      </Routes>
    </>
  );
}

export default App;
