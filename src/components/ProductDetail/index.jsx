import React, { useState } from "react";

const ProductDetail = ({ product, onClose }) => {
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [bgColor, setBgColor] = useState("white");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image Section */}
          <div
            className="w-full lg:w-3/5 relative overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <div className="aspect-square relative">
              <img
                src={product.baseImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-2/5 p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-xl font-semibold text-indigo-600 mt-2">
              {product.price}
            </p>
            <p className="mt-4 text-gray-600">{product.description}</p>

            <div className="mt-8">
              <button className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
