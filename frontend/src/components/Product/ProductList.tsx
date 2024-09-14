"use client";
import React from "react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  handleProductDialog: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  handleProductDialog,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product, i) => (
        <div
          key={i}
          className="group relative"
          onClick={() => handleProductDialog(product)}
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={`#${product.name}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.categoryId}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {product.basePrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
