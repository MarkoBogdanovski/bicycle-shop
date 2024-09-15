import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductOptions from "./ProductOptions";
import { Product } from "@/types";
import { formatPrice } from "@/utils/helpers";
import { useProduct } from "@/hooks";

interface ProductItemProps {
  product: Product;
  open: boolean;
  handleClose: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  open,
  handleClose,
}) => {
  const {
    isValid,
    totalPrice,
    handleOptionChange,
    resetProductState,
    setTotalPrice,
  } = useProduct({ product });

  // Cleanup on unmount
  React.useEffect(() => {
    setTotalPrice(product.basePrice);
    return () => {
      resetProductState();
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">
                      ${formatPrice(totalPrice)}
                    </p>
                  </section>

                  <form>
                    <ProductOptions
                      product={product}
                      handleOptionChange={handleOptionChange}
                    />
                    <button
                      type="button"
                      disabled={!isValid} // Invert the condition here
                      className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        !isValid
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      Add to bag
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductItem;
