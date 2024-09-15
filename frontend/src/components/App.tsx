import React from "react";

import Layout from "@/components/Layout";
import routes from "@/routes";

import { ProductProvider } from "@/contexts/ProductProvider";
import { PartProvider } from "@/contexts/PartProvider";

const App = (): JSX.Element => {
  return (
    <ProductProvider>
      <PartProvider>
        <Layout>{routes}</Layout>
      </PartProvider>
    </ProductProvider>
  );
};

export default App;
