"use client";

import React from "react";
import { Product } from "@/types";
import RimColorPicker from "./RimColorPicker";
import OptionsSelect from "./OptionsSelect";
import { extractParts } from "@/utils/helpers";

// const product = {
//   name: "Basic Tee 6-Pack ",
//   price: "$192",
//   rating: 3.9,
//   reviewCount: 117,
//   href: "#",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
//   imageAlt: "Two each of gray, white, and black shirts arranged on table.",
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: true },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "XXL", inStock: true },
//     { name: "XXXL", inStock: false },
//   ],
// };

interface ProductOptionsProps {
  product: Product;
  handleOptionChange: (type: string, option: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  handleOptionChange,
}) => {
  if (!Array.isArray(product.productParts) || product.productParts.length === 0)
    return <></>;

  const parts = extractParts(product);
  return (
    <section aria-labelledby="options-heading" className="mt-5">
      <h3 id="options-heading" className="sr-only">
        Product options
      </h3>

      {parts.rimColor && (
        <RimColorPicker
          label="Choose a color"
          rimColors={parts.rimColor}
          handleOptionChange={(color) => handleOptionChange("rimColor", color)}
        />
      )}

      {Object.entries(parts).map(([type, part]) => {
        if (type === "rimColor") return;
        return (
          <OptionsSelect
            key={type}
            label={type}
            options={part}
            handleOptionChange={(option) => handleOptionChange(type, option)}
          />
        );
      })}
    </section>
  );
};

export default ProductOptions;
