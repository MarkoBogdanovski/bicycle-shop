import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Option } from "@/types";

interface CustomDropdownButtonProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  minWidth?: string; // Optional min-width prop
}

const CustomDropdownButton: React.FC<CustomDropdownButtonProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  minWidth = "w-48", // Default min-width if not provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    onChange(optionId);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [dropdownRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`block rounded-md border-0 pl-5 pr-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${minWidth} flex`}
      >
        {selectedOption
          ? options.find((option) => option.name === selectedOption)?.name
          : placeholder}
        <ChevronDownIcon
          className={`w-6 ml-auto mr-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-gray-300">
          <div className="p-1">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOptionClick(option.name)}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {option.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-2 py-1 text-sm text-gray-500">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownButton;
