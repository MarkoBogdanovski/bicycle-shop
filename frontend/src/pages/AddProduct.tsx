import React, { useEffect, useState, useCallback } from "react";
import ProductInfoInput from "@/components/ProductInfoInput";
import CombinationsManager from "@/components/CombinationsManager";
import useFetchData from "@/hooks/useFetchData";
import { convertToGroupedData } from "@/utils/helpers";

const API_URL = "http://localhost:3000";

const AddProduct: React.FC = () => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<object>({});
  const [condition, setCondition] = useState<string>(""); // State for single select
  const [prohibitedOptions, setProhibitedOptions] = useState<string[]>([]);
  const { data, error, isLoading, isError } = useFetchData(
    `${API_URL}/api/parts`,
  );

  useEffect(() => {
    if (data) {
      const groups = convertToGroupedData(data);
      setLocalSelectedOptions(
        Object.keys(groups).reduce(
          (acc, groupKey) => {
            acc[groupKey] = []; // Initialize selected options for each group
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      );
    }
  }, [data]);

  const handleOptionChange = useCallback(
    (groupKey: string, newSelectedOptions: string[]) => {
      setLocalSelectedOptions((prev) => ({
        ...prev,
        [groupKey]: newSelectedOptions,
      }));
    },
    [],
  );

  const handleForm = () => {
    console.log({
      localSelectedOptions,
      condition,
      prohibitedOptions,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

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
              handleConditionChange={setCondition}
              handleProhibitedOptionsChange={setProhibitedOptions}
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
