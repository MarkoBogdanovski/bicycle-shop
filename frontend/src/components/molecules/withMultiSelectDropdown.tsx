import React, { useState } from "react";
import MultiSelectDropdown from "@/components/atoms/MultiSelectDropdown"; // Adjust the import path as needed
import { GroupedData } from "@/types"; // Import your DataItem type

interface WithMultiSelectDropdownProps {
  groupedData: GroupedData;
}
const withMultiSelectDropdown = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithMultiSelectDropdown: React.FC<
    Omit<P, keyof WithMultiSelectDropdownProps> & WithMultiSelectDropdownProps
  > = (props) => {
    const { groupedData, ...restProps } = props as WithMultiSelectDropdownProps;

    const [selectedOptions, setSelectedOptions] = useState<
      Record<string, string[]>
    >(
      Object.keys(groupedData).reduce(
        (acc, groupKey) => {
          acc[groupKey] = [];
          return acc;
        },
        {} as Record<string, string[]>,
      ),
    );

    const handleOptionChange = (groupKey: string, selected: string[]) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [groupKey]: selected,
      }));
    };

    return (
      <WrappedComponent {...(restProps as P)}>
        {Object.keys(groupedData).map((groupKey) => {
          const group = groupedData[groupKey];
          return (
            <MultiSelectDropdown
              key={groupKey}
              id={groupKey}
              label={group.label}
              group={{ [groupKey]: group }}
              selectedOptions={selectedOptions[groupKey]}
              onChange={(selected) => handleOptionChange(groupKey, selected)}
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
