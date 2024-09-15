import React, { ReactNode } from "react";

interface InfoInputProps {
  name: string; // Single selected option for the `select` element
  price: string; // Single selected option for the `select` element
  onNameChange: (selected: string) => void; // Callback for handling change in `select`
  onPriceChange: (e: object) => void; // Callback for handling change in `select`
  children: ReactNode;
}

const InfoInput: React.FC<InfoInputProps> = ({
  name,
  price,
  onNameChange,
  onPriceChange,
  children,
}) => {
  return (
    <>
      <div className="mt-5 grid grid-cols-10 gap-x-6 gap-y-8 sm:grid-cols-10">
        <div className="col-span-4">
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
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
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
              onChange={onPriceChange}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {children && children}
      </div>
    </>
  );
};

export default InfoInput;
