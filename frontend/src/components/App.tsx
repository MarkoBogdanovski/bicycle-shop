import React from "react";

import Layout from "@/components/Layout";
import routes from "@/routes";

import { AddProductProvider } from "@/contexts/AddProductContext";

const App = (): JSX.Element => {
  return (
    <AddProductProvider>
      <Layout>{routes}</Layout>
    </AddProductProvider>
  );
};

export default App;
