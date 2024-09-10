import React, { useEffect, useCallback, useState } from "react";
import withMultiSelectDropdown from "@/components/molecules/withMultiSelectDropdown"; // Adjust the import path as needed
import useFetchData from "@/hooks/useFetchData"; // Adjust the path as needed
import { convertToGroupedData } from "@/utils/helpers";

const API_URL = "http://localhost:3000";

interface MyComponentProps {
  children;
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <>{props.children}</>;
};

const EnhancedComponent = withMultiSelectDropdown(MyComponent);

export default function AddProduct() {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<
    Record<string, string[]>
  >({});
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

  const groups = data && convertToGroupedData(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <form>
      <div className="space-y-14">
        <div className="border-b border-b-grey/900 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Product Information
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 inline-grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
            {data && (
              <EnhancedComponent
                groupedData={groups}
                selectedOptions={localSelectedOptions}
                onChange={handleOptionChange} // Ensure this is a function
              />
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Prohibited Combinations
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {data?.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
