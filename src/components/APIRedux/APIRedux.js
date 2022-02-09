import React from 'react';
import './api-redux.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ServiceAdd from './ServiceAdd/ServiceAdd';
import ServiceList from './ServiceList/ServiceList';

function APIRedux() {
  return (
    <Router>
      <div className="api-redux">
        <Routes>
          <Route path="/*" element={<Navigate replace to="/services" />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default APIRedux;
