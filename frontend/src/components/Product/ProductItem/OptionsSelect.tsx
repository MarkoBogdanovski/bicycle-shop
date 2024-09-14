import React, { useState } from "react";
import { classNames, formatLabel } from "@/utils/helpers";

// Props interface for the CheckboxGroup component
interface CheckboxGroupProps {
  label: string;
  options: {
    id: string;
    name: string;
    basePrice: number; // Corrected type from integer to number
    stock: boolean; // Added stock property
  }[];
  handleOptionChange: (selectedOptionId: string) => void; // Updated to reflect option ID
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  handleOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (optionId: string) => {
    // If the option is already selected, unselect it; otherwise, select it
    const newSelection = selectedOption === optionId ? "" : optionId;

    setSelectedOption(newSelection);
    handleOptionChange(newSelection);
  };

  return (
    <fieldset aria-label={label} className="mt-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">
          {formatLabel(label)}
        </div>
        <a
          href="#"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
        >
          Guide
        </a>
      </div>

      <div className="mt-1 grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleChange(option.id)}
            disabled={!option.stock}
            className={classNames(
              selectedOption === option.id
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-white text-gray-900 hover:bg-gray-50",
              option.stock
                ? "cursor-pointer"
                : "cursor-not-allowed bg-gray-50 text-gray-200",
              "relative flex items-center justify-center rounded-md border px-2 py-3 text-xs font-medium uppercase focus:outline-none",
            )}
          >
            <span>{option.name}</span>
            {!option.stock && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                >
                  <line
                    x1={0}
                    x2={100}
                    y1={100}
                    y2={0}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
