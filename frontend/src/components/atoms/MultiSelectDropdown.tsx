import React, { useState, useCallback, useEffect, useRef } from "react";
import { GroupedData } from "@/types"; // Import your DataItem type

interface MultiSelectDropdownProps {
  id: string;
  label: string;
  groups: Record<string, GroupedData>; // groups is an object with group names as keys
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  id,
  label,
  groups,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionChange = useCallback(
    (optionId: string) => {
      const newSelectedOptions = selectedOptions.includes(optionId)
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];

      onChange(newSelectedOptions);
    },
    [selectedOptions, onChange],
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className="block w-full rounded-md border-0 px-10 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        {selectedOptions.length === 0
          ? "Select options"
          : `${selectedOptions.length} item(s) selected`}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-gray-300">
          <div className="p-1">
            {Object.keys(groups).map((groupKey) => {
              const group = groups[groupKey];
              return (
                <div key={groupKey}>
                  <div className="px-2 py-1 text-sm font-medium text-gray-900">
                    {label}
                  </div>
                  {group.options && group.options.length > 0 ? (
                    group.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center px-2 py-1"
                        onClick={(e) => e.stopPropagation()} // Prevent click from closing dropdown
                      >
                        <input
                          type="checkbox"
                          id={`option-${option.id}`}
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionChange(option.id)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`option-${option.id}`}
                          className="text-sm font-medium text-gray-900"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-sm text-gray-500">
                      No options available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
