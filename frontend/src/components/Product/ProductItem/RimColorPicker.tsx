import React, { useState } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import { classNames } from "@/utils/helpers";

interface RimColor {
  id: string;
  name: string;
  class: string; // Tailwind class for the background color, e.g., bg-red-500
  selectedClass: string; // Tailwind class for the selected state, e.g., ring-red-400
  stock: boolean; // Whether the color is in stock
}

interface RimColorPickerProps {
  label: string;
  rimColors: RimColor[];
  handleOptionChange: (color: string) => void;
}

const RimColorPicker: React.FC<RimColorPickerProps> = ({
  label,
  rimColors,
  handleOptionChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
    handleOptionChange(color);
  };

  return (
    <fieldset aria-label={label}>
      <legend className="text-sm font-medium text-gray-900">{label}</legend>

      <RadioGroup
        value={selectedColor}
        onChange={handleColorChange}
        className="mt-4 flex items-center space-x-3"
      >
        {rimColors.map((color) => (
          <Radio
            key={color.id}
            value={color.id}
            aria-label={color.name}
            disabled={!color.stock}
            className={classNames(
              color.selectedClass,
              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1",
              !color.stock && "opacity-50 cursor-not-allowed", // Add tailwind classes for out-of-stock items
            )}
          >
            {color.stock ? (
              <span
                aria-hidden="true"
                className={classNames(
                  color.class,
                  "h-8 w-8 rounded-full border border-black border-opacity-10",
                )}
              />
            ) : (
              <span
                aria-hidden="true"
                className={classNames(
                  color.class,
                  "h-8 w-8 rounded-full border border-black border-opacity-10",
                )}
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 90 90"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full stroke-2 text-gray-200"
                >
                  <line
                    x1={0}
                    x2={90}
                    y1={90}
                    y2={0}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
};

export default RimColorPicker;
