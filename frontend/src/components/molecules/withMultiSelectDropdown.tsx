import React, { useState, useCallback } from "react";
import MultiSelectDropdown from "@/components/atoms/MultiSelectDropdown"; // Adjust the import path as needed
import { GroupedData } from "@/types"; // Import your DataItem type

interface WithMultiSelectDropdownProps {
  groupedData: Record<string, GroupedData>;
  selectedOptions: Record<string, string[]>; // Ensure this matches MultiSelectDropdown's expected type
  onChange: (groupKey: string, selected: string[]) => void;
}

type LocalSelectedOptions = Record<string, string[]>; // Map group keys to selected option IDs
const withMultiSelectDropdown = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithMultiSelectDropdown: React.FC<
    Omit<P, keyof WithMultiSelectDropdownProps> & WithMultiSelectDropdownProps
  > = (props) => {
    const { groupedData, selectedOptions, onChange, ...restProps } =
      props as WithMultiSelectDropdownProps;

    const [localSelectedOptions, setLocalSelectedOptions] =
      useState<LocalSelectedOptions>(
        Object.keys(groupedData).reduce((acc, key) => {
          acc[key] = [];
          return acc;
        }, {} as LocalSelectedOptions),
      );

    const handleOptionChange = useCallback(
      (groupKey: string, newSelectedOptions: string[]) => {
        setLocalSelectedOptions((prev) => ({
          ...prev,
          [groupKey]: newSelectedOptions,
        }));
        if (onChange) {
          onChange(groupKey, newSelectedOptions); // Ensure onChange is a function
        }
      },
      [onChange],
    );

    return (
      <WrappedComponent {...(restProps as P)}>
        {Object.keys(groupedData).map((groupKey) => {
          const group = groupedData[groupKey];
          return (
            <MultiSelectDropdown
              key={groupKey}
              id={groupKey}
              label={group.label}
              groups={{ [groupKey]: group }}
              selectedOptions={localSelectedOptions[groupKey] || []}
              onChange={(selected) => handleOptionChange(groupKey, selected)} // Ensure this is a function
            />
          );
        })}
      </WrappedComponent>
    );
  };

  WithMultiSelectDropdown.displayName = `WithMultiSelectDropdown(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithMultiSelectDropdown;
};

export default withMultiSelectDropdown;
