import React from "react";
import ProductInfoInput from "@/components/ProductInfoInput";
import CombinationsManager from "@/components/CombinationsManager";
import { useAddProductContext } from "@/contexts/AddProductContext";

const AddProduct: React.FC = () => {
  const {
    localSelectedOptions,
    condition,
    prohibitedOptions,
    combinations,
    setLocalSelectedOptions,
    setCombinations,
    data,
    isLoading,
    isError,
  } = useAddProductContext();

  const handleOptionChange = (
    groupKey: string,
    newSelectedOptions: string[],
  ) => {
    setLocalSelectedOptions((prev) => ({
      ...prev,
      [groupKey]: newSelectedOptions,
    }));
  };

  // TODO MAKE SURE THAT ONLY CORRECT FIELDS OF CORRECT COMBINATIONS ARE UPDATED
  const handleCombinationsChange = (
    groupKey: string | number,
    newSelectedOptions: Partial<{ condition: string; options: string[] }>,
  ) => {
    console.log(groupKey, newSelectedOptions);
    setCombinations((prev) => {
      const existingCombination = prev[groupKey] || {
        condition: "",
        options: [],
      };

      // Only update the fields that have new values
      const updatedCombination = {
        ...existingCombination,
        ...newSelectedOptions, // Apply only provided values
      };

      return {
        ...prev,
        [groupKey]: updatedCombination,
      };
    });
  };

  const handleForm = () => {
    console.log(combinations);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <form>
      <div className="border-b border-b-grey/900 pb-6">
        <div className="space-y-7">
          {/* Product Information */}
          <ProductInfoInput />

          {/* Combinations Manager */}
          {data && (
            <CombinationsManager
              data={data}
              localSelectedOptions={localSelectedOptions}
              condition={condition}
              prohibitedOptions={prohibitedOptions}
              handleCombinationsChange={handleCombinationsChange}
              handleOptionChange={handleOptionChange}
            />
          )}
        </div>
      </div>
      {/* Submit and Cancel Buttons */}
      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleForm}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
