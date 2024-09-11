import React, { useState, useCallback, useEffect, useRef } from "react";
import { GroupedData } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface MultiSelectDropdownProps {
  id: string;
  label: string;
  groups: GroupedData[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  minWidth: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  id,
  label,
  groups,
  selectedOptions,
  onChange,
  minWidth = "w-48", // Default min-width if not provided
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
        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`block rounded-md border-0 pl-5 pr-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${minWidth} flex`}
      >
        {selectedOptions.length === 0
          ? "Select options"
          : `${selectedOptions.length} item(s) selected`}
        <ChevronDownIcon
          className={`w-6 ml-auto mr-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-gray-300">
          <div className="p-1">
            {Object.keys(groups).map((groupKey) => {
              const group = groups[groupKey];
              return (
                <div key={groupKey}>
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
                          checked={selectedOptions.includes(option.name)}
                          onChange={() => handleOptionChange(option.name)}
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
