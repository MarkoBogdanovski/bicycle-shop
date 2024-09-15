import React, { useEffect } from "react";
import { OptionsCombinations } from "@/components/CombinationsManager";
import PartInfoInput from "@/components/InfoInput/PartInfoInput";
import Notification from "@/components/Notification";
import { useFetchData, useOptionsCombinations } from "@/hooks";
import { usePartContext } from "@/contexts/PartProvider";

const AddPart: React.FC = () => {
  const { data, error, isLoading, isError } = useFetchData(`parts`);
  const [showNotification, setShowNotification] = React.useState<boolean>(true);
  const {
    combinations,
    setCombinations,
    localSelectedOptions,
    notification,
    resetForm,
    handleForm,
  } = usePartContext();
  const handleCombinationsChange = useOptionsCombinations({
    setCombinations,
  });
  useEffect(() => setShowNotification(!!notification.message), [notification]);

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleConditionChange = (
    key: string | number,
    newCondition: string,
  ) => {
    handleCombinationsChange(key, { condition: newCondition });
  };

  const handlePriceChange = (key: string | number, newPrice: string) => {
    handleCombinationsChange(key, { price: newPrice });
  };

  return (
    <form>
      {showNotification && (
        <Notification
          type={notification.type}
          message={notification?.message}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="border-b border-b-grey/900 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Part Information
        </h2>
        <div className="space-y-5">
          <PartInfoInput />

          <OptionsCombinations
            data={data}
            localSelectedOptions={localSelectedOptions}
            onConditionChange={handleConditionChange}
            onPriceChange={handlePriceChange} // Ensure this is provided
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={resetForm}
          className="rounded-md px-3 py-2 text-sm font-semibold text-gray-9000 hover:shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default AddPart;
