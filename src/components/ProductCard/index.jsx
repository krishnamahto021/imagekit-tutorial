import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(product)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={product.baseImage}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2">
          <span className="font-semibold text-indigo-600">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
