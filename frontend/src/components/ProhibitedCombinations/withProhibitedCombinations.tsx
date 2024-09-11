import React, { useState } from "react";

interface WithProhibitedCombinationsStateProps {
  data: any[];
  condition: string;
  prohibitedOptions: string[];
  onConditionChange: (value: string) => void;
  onProhibitedOptionsChange: (value: string[]) => void;
}

const withProhibitedCombinationsState = (
  WrappedComponent: React.ComponentType<WithProhibitedCombinationsStateProps>,
) => {
  const WithProhibitedCombinationsState: React.FC<
    WithProhibitedCombinationsStateProps
  > = (props) => {
    const [localCondition, setLocalCondition] = useState<string>(
      props.condition,
    );
    const [localProhibitedOptions, setLocalProhibitedOptions] = useState<
      string[]
    >(props.prohibitedOptions);

    const handleConditionChange = (value: string) => {
      setLocalCondition(value);
      props.onConditionChange(value);
    };

    const handleProhibitedOptionsChange = (value: string[]) => {
      setLocalProhibitedOptions(value);
      props.onProhibitedOptionsChange(value);
    };

    return (
      <WrappedComponent
        {...props}
        condition={localCondition}
        prohibitedOptions={localProhibitedOptions}
        onConditionChange={handleConditionChange}
        onProhibitedOptionsChange={handleProhibitedOptionsChange}
      />
    );
  };

  WithProhibitedCombinationsState.displayName = `WithProhibitedCombinationsState(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithProhibitedCombinationsState;
};

export default withProhibitedCombinationsState;
