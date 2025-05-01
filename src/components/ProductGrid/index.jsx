import React from "react";
import ProductCard from "../ProductCard";

const ProductGrid = ({ products, onSelectProduct }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Showcase
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
