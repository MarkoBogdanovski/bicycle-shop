import React from "react";

import Layout from "@/components/Layout";
import routes from "@/routes";

import { ProductProvider } from "@/providers/ProductProvider";

const App = (): JSX.Element => {
  return (
    <ProductProvider>
      <Layout>{routes}</Layout>
    </ProductProvider>
  );
};

export default App;
