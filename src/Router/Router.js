import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import DetailProduct from '../Pages/DetailProduct';
import ListProduct from '../Pages/ListProduct';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProduct />} />
          {/* <Route  path="/detail/:data" element={<DetailProduct {...props} />} /> */}
          <Route exact path="/detail/:id" element={<DetailProduct /> } />
        </Routes>
      </BrowserRouter>
    );
  }
}
