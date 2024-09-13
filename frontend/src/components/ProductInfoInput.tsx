import React, { useEffect, useState, useCallback } from "react";
import { useAddProductContext } from "@/providers/AddProductProvider";
import { formatPrice } from "@/utils/helpers";
import { debounce } from "lodash";

const ProductInfoInput: React.FC = () => {
  const [price, setPrice] = useState<string>("");
  const { productName, productPrice, setProductName, setProductPrice } =
    useAddProductContext();

  // Debounced function to handle price formatting
  const debouncedHandlePriceChange = useCallback(
    debounce((inputValue: string) => {
      const formattedPrice = formatPrice(inputValue);
      setProductPrice(formattedPrice);
    }, 500), // 500ms debounce delay
    [],
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
    debouncedHandlePriceChange(inputValue); // Call debounced function
  };

  useEffect(() => {
    setPrice(productPrice);
  }, [productPrice]);

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              required
              id="name"
              name="name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-3">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
          <div className="mt-2">
            <input
              required
              id="price"
              name="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="block w-1/2 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfoInput;
