import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import DetailProduct from '../Pages/DetailProduct';
import ListProduct from '../Pages/ListProduct';
import Login from '../Pages/Login';
import Auth from './Auth';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product" element={<Auth><ListProduct /></Auth>} />
        <Route exact path="/detail/:id" element={<Auth><DetailProduct /></Auth>} />
      </Routes>
    </BrowserRouter>
  );
}

