import React from "react";
import { Route, Routes } from "react-router-dom";

import Product from "./pages/AddProduct";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product" element={<Product />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
