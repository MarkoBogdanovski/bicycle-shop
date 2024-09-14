import React, { useState } from "react";
import ProductItem from "@/components/Product";
import ProductList from "@/components/Product/ProductList";
import useFetchData from "@/hooks/useFetchData";
import { Product } from "@/types";

const Home: React.FC = () => {
  const { data, error, isLoading, isError } = useFetchData(`products`);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductDialog = (product: Product): void => {
    setSelectedProduct(product);
    setOpen((prevOpen) => !prevOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      {selectedProduct && (
        <ProductItem
          open={open}
          handleClose={() => setOpen(false)}
          product={selectedProduct}
        />
      )}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <ProductList
            products={data}
            handleProductDialog={handleProductDialog}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
