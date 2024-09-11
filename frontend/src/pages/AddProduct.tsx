import React from "react";
import ProductInfoInput from "@/components/ProductInfoInput";
import CombinationsManager from "@/components/CombinationsManager";
import { useAddProductContext } from "@/contexts/AddProductContext";
import useHandleCombinationsChange from "@/hooks/useHandleCombinationsChange"; // Import the custom hook

const AddProduct: React.FC = () => {
  const {
    localSelectedOptions,
    combinations,
    setLocalSelectedOptions,
    setCombinations,
    data,
    isLoading,
    isError,
  } = useAddProductContext();

  const handleCombinationsChange = useHandleCombinationsChange({
    setCombinations,
  });

  const handleOptionChange = (
    groupKey: string,
    newSelectedOptions: string[],
  ) => {
    setLocalSelectedOptions((prev) => ({
      ...prev,
      [groupKey]: newSelectedOptions,
    }));
  };

  const handleForm = () => {
    console.log(combinations);
  };

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <form>
      <div className="border-b border-b-grey/900 pb-6">
        <div className="space-y-7">
          <ProductInfoInput />

          <CombinationsManager
            data={data}
            localSelectedOptions={localSelectedOptions}
            handleCombinationsChange={handleCombinationsChange}
            handleOptionChange={handleOptionChange}
          />
        </div>
      </div>
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
