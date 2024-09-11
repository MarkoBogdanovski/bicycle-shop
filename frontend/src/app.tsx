import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "@/components/App";
import queryClient from "./queryClient"; // Adjust the path as needed

import "./input.css";

const container = document.getElementById("app");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
